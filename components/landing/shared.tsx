import type { CSSProperties } from 'react'
import Image from 'next/image'
import { HIDEABLE, type LandingContent, type ServiceItem, type StyledSeg } from '@/lib/content/schema'

/* ------------------------------------------------------------------
   Lógica de contenido compartida por las tres variantes. El contenido es
   el mismo de la landing (getContent); acá solo se adapta para mostrarlo.
------------------------------------------------------------------ */

/** Secciones visibles y links que no apuntan a una sección oculta. */
export function visibility(c: LandingContent) {
  const show = (key: string) => !c.hidden.includes(key)
  const dead = new Set(c.hidden.map((k) => HIDEABLE[k]).filter(Boolean))
  const live = <T extends { href: string }>(links: T[]) => links.filter((l) => !dead.has(l.href))
  return { show, live }
}

/** Sin el glifo decorativo del contenido ("◆ servicios" → "servicios"). */
export const cleanKicker = (s: string) => s.replace(/^[\s◆◇▶►•·▸]+/, '').trim()

/** Sin la flecha de texto: los botones llevan su propio ícono. */
export const cleanLabel = (s: string) => s.replace(/\s*[→›»]\s*$/, '').trim()

/** "estudio web · buenos aires · est. 2025" → ["estudio web", …] */
export const splitDots = (s: string) =>
  cleanKicker(s)
    .split('·')
    .map((p) => p.trim())
    .filter(Boolean)

/** "01 · ENCENDER" → { num: "01", word: "ENCENDER" }. Si no tiene esa forma,
 *  el texto entero va en word. */
export function splitMeta(meta: string) {
  const m = meta.match(/^\s*(\d+)\s*[·.\-—]\s*(.+)$/)
  return m ? { num: m[1], word: m[2].trim() } : { num: '', word: meta.trim() }
}

export const pad = (n: number) => String(n).padStart(2, '0')

export const isExternal = (href: string) => /^https?:\/\//.test(href)
export const extProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener' } : {}

/** Primera línea del título de un servicio (los títulos admiten salto). */
export const firstLine = (s: string) => s.split('\n')[0]

/** Precio más bajo publicado de un servicio, para el índice. Si no hay un
 *  número en los planes, devuelve el precio en texto ("Cotización…"). */
export function lowestPrice(item: ServiceItem): { label: string; from: boolean } | null {
  const toNum = (p: string) => {
    const m = p.match(/\$\s?([\d.]+)/)
    return m ? Number(m[1].replace(/\./g, '')) : NaN
  }
  const priced = item.plans.filter((p) => !Number.isNaN(toNum(p.price)))
  if (priced.length) {
    const min = priced.reduce((a, b) => (toNum(b.price) < toNum(a.price) ? b : a))
    return { label: `${min.price}${min.unit}`, from: priced.length > 1 }
  }
  if (item.price) return { label: item.price, from: false }
  return null
}

/** Agrupa los servicios: los anchos van solos; los angostos seguidos van de a
 *  pares en una fila. */
export function groupServices(items: ServiceItem[]) {
  const groups: { wide: boolean; items: { item: ServiceItem; n: number }[] }[] = []
  items.forEach((item, i) => {
    const entry = { item, n: i + 1 }
    const last = groups[groups.length - 1]
    if (!item.wide && last && !last.wide && last.items.length < 2) last.items.push(entry)
    else groups.push({ wide: item.wide, items: [entry] })
  })
  return groups
}

/* ------------------------------------------------------------------
   Segmentos de título. Los colores del panel (paleta vieja) se traducen a
   tonos de la paleta nueva, que cambian según el modo para mantener
   contraste. Bricolage no tiene itálica: se respeta el color, no la cursiva.
------------------------------------------------------------------ */
const SEG_TONE: Record<string, string> = {
  '#f3ead8': 'fg',
  '#f0e9d8': 'fg',
  '#d94a2b': 'accent',
  '#7aa6d6': 'blue',
  '#2f5cb0': 'blue',
  '#f4c543': 'yellow',
  '#f2c744': 'yellow',
  '#a39989': 'muted',
}

export function Seg({ seg }: { seg: StyledSeg }) {
  const tone = seg.color ? SEG_TONE[seg.color.toLowerCase()] : undefined
  const style: CSSProperties = {}
  if (seg.underline) style.textDecoration = 'underline'
  if (seg.size) style.fontSize = `${seg.size}em`
  if (!tone && !seg.underline && !seg.size) return <>{seg.text}</>
  return (
    <span className={tone ? `bx-tone bx-tone--${tone}` : undefined} style={style}>
      {seg.text}
    </span>
  )
}

/* ------------------------------------------------------------------
   Logo: símbolo + wordmark, en dos piezas para dimensionarlas por separado.
   - Símbolo: recortado píxel a píxel del lockup oficial (sin redibujar).
   - Wordmark: la propuesta de MARCA/FORJO-BRAND-2026/03-LOGO/logo-evolution
     ("forjo" Bricolage + "f" Archivo, "studio" Sora, divisor).
   El tamaño sale de --logo-mark (alto del símbolo; CSS en landing.css).
   `height` lo fija en px para un uso puntual. Se muestra la versión que
   corresponde al fondo (tinta sobre crema, crema sobre tinta).
------------------------------------------------------------------ */
const MARK = { w: 143, h: 170 } // forjo-symbol-*.png
const WORD = { w: 1081, h: 186 } // forjo-studio-wordmark-*.png (@2x)

export function Logo({ height, className = '' }: { height?: number; className?: string }) {
  const style = height ? ({ '--logo-mark': `${height}px` } as React.CSSProperties) : undefined
  const markH = height ?? 30
  const wordH = Math.round(markH * 0.73)
  const piece = (kind: 'symbol' | 'wordmark', tone: 'tinta' | 'crema') => {
    const size = kind === 'symbol' ? MARK : WORD
    const h = kind === 'symbol' ? markH : wordH
    return (
      <Image
        className={`bx-logo__img bx-logo__img--on-${tone === 'tinta' ? 'light' : 'dark'}`}
        src={kind === 'symbol' ? `/brand/forjo-symbol-${tone}.png` : `/brand/forjo-studio-wordmark-${tone}.png`}
        alt=""
        width={Math.round((size.w / size.h) * h)}
        height={h}
        // La landing es oscura: la versión crema va precargada; la tinta solo
        // se descarga si algún fondo claro la muestra.
        priority={tone === 'crema'}
      />
    )
  }
  return (
    <span className={`bx-logo ${className}`} style={style} role="img" aria-label="Forjo Studio">
      <span className="bx-logo__mark">
        {piece('symbol', 'tinta')}
        {piece('symbol', 'crema')}
      </span>
      <span className="bx-logo__word">
        {piece('wordmark', 'tinta')}
        {piece('wordmark', 'crema')}
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------
   Íconos y figuras. Trazo cuadrado de 2px, mismo sistema en todo.
------------------------------------------------------------------ */
export function Arrow({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 12h16M13 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function ArrowUpRight({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 17L17 7M8 7h9v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const SHAPES = ['square', 'circle', 'triangle', 'block'] as const
export type ShapeKind = (typeof SHAPES)[number]
export const shapeAt = (i: number): ShapeKind => SHAPES[i % SHAPES.length]

/** Figura Bauhaus: cuadrado naranja, círculo (tinta o crema según el fondo),
 *  triángulo azul, cuadrado amarillo. */
export function Shape({ kind, size = 16, className = '' }: { kind: ShapeKind; size?: number; className?: string }) {
  return (
    <svg
      className={`bx-shape bx-shape--${kind} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      {kind === 'square' && <rect width="16" height="16" />}
      {kind === 'block' && <rect width="16" height="16" />}
      {kind === 'circle' && <circle cx="8" cy="8" r="8" />}
      {kind === 'triangle' && <path d="M0 0L16 16H0Z" />}
    </svg>
  )
}

/** Botón flotante de WhatsApp, en la paleta de la marca. */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5493487623630"
      target="_blank"
      rel="noopener"
      className="bx-wa"
      aria-label="Contactar por WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.524 5.855L.054 23.454a.5.5 0 0 0 .492.596l5.809-1.522A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.733.979.995-3.636-.235-.374A9.865 9.865 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z" />
      </svg>
    </a>
  )
}

/** Marquesina: la primera copia es la que leen los lectores de pantalla; las
 *  repeticiones (para el loop) quedan ocultas.
 *  minChars: si la lista es corta, se repite dentro de cada copia hasta
 *  sumar esa cantidad de caracteres, para que una copia siempre sea más
 *  ancha que la pantalla y el loop no deje un hueco. --n (ítems por copia)
 *  queda en el track para que el CSS calcule la duración. */
export function MarqueeTrack({
  items,
  className,
  itemClass,
  sep,
  minChars = 0,
}: {
  items: string[]
  className: string
  itemClass: string
  sep: (i: number) => React.ReactNode
  minChars?: number
}) {
  const chars = items.join('').length || 1
  const times = Math.max(1, Math.ceil(minChars / chars))
  const fill = Array.from({ length: times }, () => items).flat()
  return (
    <div className={className} style={{ '--n': fill.length } as React.CSSProperties}>
      {[0, 1].map((rep) => (
        <ul key={rep} aria-hidden={rep > 0 ? true : undefined} aria-label={rep === 0 ? 'Lo que hacemos' : undefined}>
          {fill.map((t, i) => (
            <li key={i} className={itemClass} aria-hidden={rep === 0 && i >= items.length ? true : undefined}>
              {sep(i)}
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
