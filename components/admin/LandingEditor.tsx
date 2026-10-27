'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { saveContent } from '@/app/admin/actions'
import { SectionBody, label } from '@/components/admin/ContentFields'
import { HIDEABLE, type LandingContent } from '@/lib/content/schema'
import { isMessage, type FromPreview, type ToPreview } from '@/lib/editor/protocol'

type Device = 'desktop' | 'mobile'
const DEVICE_WIDTH: Record<Device, number> = { desktop: 1280, mobile: 390 }

/** Secciones en el orden de la página, con una pista de qué es cada una. */
const SECTIONS: { key: keyof LandingContent; hint: string }[] = [
  { key: 'seo', hint: 'Título y descripción en Google y redes' },
  { key: 'nav', hint: 'Links de arriba y botón de contacto' },
  { key: 'hero', hint: 'Lo primero que se ve' },
  { key: 'marquee', hint: 'Franja de texto que se mueve' },
  { key: 'services', hint: 'Productos, planes y precios' },
  { key: 'process', hint: 'Cómo trabajamos, en pasos' },
  { key: 'work', hint: 'Proyectos y capturas' },
  { key: 'about', hint: 'Quiénes somos y números' },
  { key: 'contact', hint: 'Formulario y datos de contacto' },
  { key: 'footer', hint: 'Columnas de links y legales' },
]

/** JSON con las claves ordenadas: dos versiones iguales dan el mismo texto
 *  aunque las claves se hayan cargado en otro orden. Para saber si hay cambios. */
function stable(v: unknown): string {
  return JSON.stringify(v, (_k, x) =>
    x && typeof x === 'object' && !Array.isArray(x)
      ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, (x as Record<string, unknown>)[k]]))
      : x,
  )
}

// Íconos (trazos de Lucide) inline: el panel no carga una librería de íconos.
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}
const EyeIcon = () => (
  <Icon>
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
)
const EyeOffIcon = () => (
  <Icon>
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </Icon>
)
const MonitorIcon = () => (
  <Icon>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </Icon>
)
const PhoneIcon = () => (
  <Icon>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </Icon>
)
const ExternalIcon = () => (
  <Icon>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
  </Icon>
)

/**
 * Editor de la landing: las secciones a la izquierda (al abrir una, sus
 * campos), la vista previa a la derecha, que se actualiza mientras se escribe.
 * Guardar publica todo junto; hasta entonces los cambios viven acá, y salir
 * con cambios sin guardar pide confirmación. Copia del editor visual de
 * webs-cms, adaptado a un solo contenido y orden fijo.
 */
export function LandingEditor({ initial, initialOpen }: { initial: LandingContent; initialOpen?: string }) {
  const [content, setContent] = useState<LandingContent>(initial)
  const [saved, setSaved] = useState<LandingContent>(initial)
  const [openKey, setOpenKey] = useState<string | null>(initialOpen ?? null)
  const [device, setDevice] = useState<Device>('desktop')
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'saved' | 'error'; text?: string }>({ kind: 'idle' })
  const [ready, setReady] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [boxSize, setBoxSize] = useState({ w: 0, h: 0 })

  const dirty = useMemo(() => stable(content) !== stable(saved), [content, saved])

  const post = useCallback((m: ToPreview) => {
    frame.current?.contentWindow?.postMessage(m, window.location.origin)
  }, [])

  // La vista previa avisa que está lista y pide abrir secciones al tocarlas.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return
      if (!isMessage<FromPreview>(e.data)) return
      if (e.data.type === 'forjo:ready') setReady(true)
      if (e.data.type === 'forjo:select') {
        setOpenKey(e.data.section)
        setTab('edit')
        document.getElementById(`sec-${e.data.section}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
    window.addEventListener('message', onMessage)
    // Por si el iframe cargó antes de que este listener existiera.
    post({ type: 'forjo:hello' })
    return () => window.removeEventListener('message', onMessage)
  }, [post])

  // Cada cambio viaja a la vista previa (sin guardar).
  useEffect(() => {
    if (ready) post({ type: 'forjo:content', content })
  }, [ready, content, post])

  // Al abrir una sección, la vista previa baja hasta ella.
  useEffect(() => {
    if (ready && openKey) post({ type: 'forjo:focus', section: openKey })
  }, [ready, openKey, post])

  // Salir con cambios sin guardar (cerrar la pestaña, recargar).
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  // En un celular, la vista previa arranca como celular: la computadora
  // escalada a 360 px no se lee.
  useEffect(() => {
    if (window.innerWidth < 1024) setDevice('mobile')
  }, [])

  // Tamaño del área de la vista previa, para escalar la computadora a lo ancho.
  useEffect(() => {
    if (!box.current) return
    const ro = new ResizeObserver(([e]) => setBoxSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  function update(change: (c: LandingContent) => LandingContent) {
    setContent(change)
    if (status.kind !== 'idle') setStatus({ kind: 'idle' })
  }

  function toggleHidden(key: string) {
    update((c) => ({
      ...c,
      hidden: c.hidden.includes(key) ? c.hidden.filter((k) => k !== key) : [...c.hidden, key],
    }))
  }

  async function save() {
    setStatus({ kind: 'saving' })
    const r = await saveContent(content).catch(() => ({ error: 'Sin conexión con el servidor.' }))
    if (r?.error) {
      setStatus({ kind: 'error', text: r.error })
      return
    }
    setSaved(content)
    setStatus({ kind: 'saved' })
  }

  function discard() {
    if (!confirm('¿Descartar los cambios sin guardar?\n\nLa landing vuelve a como estaba la última vez que guardaste.'))
      return
    setContent(saved)
    setStatus({ kind: 'idle' })
  }

  const leave = (e: React.MouseEvent) => {
    if (dirty && !confirm('Tenés cambios sin guardar. ¿Salir igual?')) e.preventDefault()
  }

  const width = DEVICE_WIDTH[device]
  const scale = boxSize.w ? Math.min(1, (boxSize.w - 32) / width) : 1
  const frameH = Math.max(0, boxSize.h - 32)
  const statusText =
    status.kind === 'saving'
      ? 'Guardando…'
      : status.kind === 'error'
        ? status.text
        : dirty
          ? 'Cambios sin guardar'
          : status.kind === 'saved'
            ? 'Guardado: ya está en la web'
            : 'Todo guardado'
  const dot = status.kind === 'error' ? 'is-error' : dirty ? 'is-dirty' : 'is-ok'

  return (
    <div className="ed-shell">
      <header className="ed-header">
        <span className="adm-brand">Forjo · Editor</span>
        <span role="status" className={`ed-status${status.kind === 'error' ? ' is-error' : ''}`}>
          <span aria-hidden="true" className={`ed-dot ${dot}`} />
          {statusText}
        </span>
        {/* div y no nav: el `nav` global es el menú de la landing. */}
        <div className="ed-links">
          <a href="/admin/mensajes" onClick={leave}>
            Mensajes
          </a>
          <a href="/admin/cuenta" onClick={leave}>
            Cuenta
          </a>
        </div>
        <div className="ed-actions">
          {dirty && (
            <button type="button" className="ed-ghost" onClick={discard} disabled={status.kind === 'saving'}>
              Descartar
            </button>
          )}
          <button
            type="button"
            className="adm-btn adm-btn--primary"
            onClick={save}
            disabled={!dirty || status.kind === 'saving'}
          >
            {status.kind === 'saving' ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </header>

      {/* Celular: una cosa a la vez. */}
      <div className="ed-tabs" role="tablist">
        {(['edit', 'preview'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={tab === t ? 'is-on' : undefined}
          >
            {t === 'edit' ? 'Editar' : 'Vista previa'}
          </button>
        ))}
      </div>

      <div className="ed-body">
        <aside className={`ed-side${tab === 'edit' ? ' is-on' : ''}`}>
          <ul className="ed-list">
            {SECTIONS.map(({ key, hint }) => {
              const open = openKey === key
              const hideable = key in HIDEABLE
              const visible = !content.hidden.includes(key)
              const name = label(key)
              return (
                <li key={key} id={`sec-${key}`} className="ed-sec">
                  <div className="ed-sec-head">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenKey(open ? null : key)}
                      className="ed-sec-toggle"
                    >
                      <span className={`ed-sec-name${visible ? '' : ' is-hidden'}`}>{name}</span>
                      <span className="ed-sec-hint">{hint}</span>
                    </button>
                    {hideable && (
                      <button
                        type="button"
                        className="ed-icon-btn"
                        aria-pressed={!visible}
                        aria-label={visible ? `Ocultar ${name} de la web` : `Mostrar ${name} en la web`}
                        title={visible ? 'Visible en la web' : 'Oculta'}
                        onClick={() => toggleHidden(key)}
                      >
                        {visible ? <EyeIcon /> : <EyeOffIcon />}
                      </button>
                    )}
                  </div>
                  {open && (
                    <div className="ed-sec-body">
                      {!visible && (
                        <p className="ed-note">
                          Esta sección está oculta: no se ve en la web hasta que la muestres con el ojo. Sus links
                          del menú y del footer también se ocultan.
                        </p>
                      )}
                      <SectionBody
                        value={content[key]}
                        onChange={(v) => update((c) => ({ ...c, [key]: v }))}
                      />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </aside>

        <section aria-label="Vista previa" className={`ed-preview${tab === 'preview' ? ' is-on' : ''}`}>
          <div className="ed-preview-bar">
            <div className="ed-seg" role="group" aria-label="Tamaño de la vista previa">
              {(
                [
                  ['desktop', 'Computadora', MonitorIcon],
                  ['mobile', 'Celular', PhoneIcon],
                ] as const
              ).map(([d, text, DeviceIcon]) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={device === d}
                  onClick={() => setDevice(d)}
                  className={device === d ? 'is-on' : undefined}
                >
                  <DeviceIcon />
                  {text}
                </button>
              ))}
            </div>
            <a href="/" target="_blank" rel="noopener" className="ed-open">
              <span className="ed-open-long">Ver la web publicada</span>
              <span className="ed-open-short">Ver web</span>
              <ExternalIcon />
            </a>
          </div>
          <div ref={box} className="ed-stage">
            <div className="ed-device" style={{ width: width * scale, height: frameH }}>
              <iframe
                ref={frame}
                title="Vista previa de la landing"
                src="/admin/vista-previa"
                onLoad={() => post({ type: 'forjo:hello' })}
                style={{
                  width,
                  height: frameH / scale,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
