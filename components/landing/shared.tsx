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
   Logo: los lockups oficiales, sin redibujar. Se muestra el que corresponde
   al fondo (tinta sobre crema, crema sobre tinta) según el tema activo.
------------------------------------------------------------------ */
export function Logo({ height = 32, className = '' }: { height?: number; className?: string }) {
  const width = Math.round((730 / 190) * height)
  return (
    <span className={`bx-logo ${className}`} style={{ height }}>
      <Image
        className="bx-logo__img bx-logo__img--on-light"
        src="/brand/forjo-studio-lockup-tinta.png"
        alt="Forjo Studio"
        width={width}
        height={height}
        priority
      />
      <Image
        className="bx-logo__img bx-logo__img--on-dark"
        src="/brand/forjo-studio-lockup-crema.png"
        alt="Forjo Studio"
        width={width}
        height={height}
        priority
      />
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
 *  repeticiones (para el loop) quedan ocultas. */
export function MarqueeTrack({
  items,
  className,
  itemClass,
  sep,
}: {
  items: string[]
  className: string
  itemClass: string
  sep: (i: number) => React.ReactNode
}) {
  return (
    <div className={className}>
      {[0, 1].map((rep) => (
        <ul key={rep} aria-hidden={rep > 0 ? true : undefined} aria-label={rep === 0 ? 'Lo que hacemos' : undefined}>
          {items.map((t, i) => (
            <li key={i} className={itemClass}>
              {sep(i)}
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
