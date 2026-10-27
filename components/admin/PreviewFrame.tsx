'use client'

import { useEffect, useState } from 'react'
import { Landing } from '@/components/Landing'
import type { LandingContent } from '@/lib/content/schema'
import { isMessage, type FromPreview, type ToPreview } from '@/lib/editor/protocol'

/**
 * La landing dentro del iframe del editor. No lee la base: dibuja lo que le
 * manda el editor (sin guardar) con el mismo componente que la página pública.
 * Al estar en un iframe, los breakpoints responden al ancho de la vista previa
 * (celular de verdad) y los estilos del panel no la tocan.
 *
 * Es una vista, no la web: los links a otras páginas y el formulario no hacen
 * nada (un envío de prueba crearía un mensaje real en el panel).
 */
export function PreviewFrame() {
  const [content, setContent] = useState<LandingContent | null>(null)
  // `n` vuelve a disparar el foco aunque se pida la misma sección dos veces.
  const [focus, setFocus] = useState<{ section: string; n: number } | null>(null)

  // Recibe el contenido y los pedidos de foco; avisa al editor que está lista.
  useEffect(() => {
    const send = (m: FromPreview) => window.parent.postMessage(m, window.location.origin)
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || !isMessage<ToPreview>(e.data)) return
      if (e.data.type === 'forjo:hello') send({ type: 'forjo:ready' })
      if (e.data.type === 'forjo:content') setContent(e.data.content)
      if (e.data.type === 'forjo:focus') setFocus({ section: e.data.section, n: Date.now() })
    }
    window.addEventListener('message', onMessage)
    send({ type: 'forjo:ready' })
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Foco: baja hasta la sección y la marca un momento.
  useEffect(() => {
    if (!content || !focus) return
    const el = document.querySelector<HTMLElement>(`[data-edit="${focus.section}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.setAttribute('data-editor-focus', '')
    const t = window.setTimeout(() => el.removeAttribute('data-editor-focus'), 1600)
    return () => window.clearTimeout(t)
    // Solo cuando llega un pedido de foco, no con cada tecla.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus])

  // Links y formulario: es una vista. Las anclas internas (#seccion) sí
  // navegan; un clic sobre una sección le pide al editor que la abra.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const a = target.closest('a')
      if (a && !(a.getAttribute('href') ?? '').startsWith('#')) e.preventDefault()
      const sec = target.closest<HTMLElement>('[data-edit]')
      if (sec?.dataset.edit) {
        window.parent.postMessage(
          { type: 'forjo:select', section: sec.dataset.edit } satisfies FromPreview,
          window.location.origin,
        )
      }
    }
    const onSubmit = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }
    document.addEventListener('click', onClick, true)
    document.addEventListener('submit', onSubmit, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('submit', onSubmit, true)
    }
  }, [])

  if (!content) return <div className="adm-preview-loading">Cargando vista previa…</div>
  return <Landing c={content} fx={false} />
}
