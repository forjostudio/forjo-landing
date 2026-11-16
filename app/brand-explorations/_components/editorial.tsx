import type { CSSProperties } from 'react'
import type { StyledSeg } from '@/lib/content/schema'
import { Seg } from './shared'
import '../editorial.css'

/* ------------------------------------------------------------------
   Piezas compartidas de la dirección EDITORIAL BRUTALISM (las tres
   variantes -eb). La geometría sale de la construcción del logo, usada por
   partes y nunca armada como la F:
   - brazo: barra naranja 38×14 con el punto amarillo (r 5) en el extremo
   - trapecio: la barra azul, 30 arriba, 16 abajo, 14 de alto, corte a 45°
   - palo: la barra vertical, 14 de ancho por 68 de alto
------------------------------------------------------------------ */

/** Titular por líneas: cada línea entra desde abajo de su propia máscara. */
export function Lines({ lines, className = '' }: { lines: StyledSeg[][]; className?: string }) {
  return (
    <>
      {lines.map((segs, i) => (
        <span key={i} className={`eb-line ${className}`} style={{ ['--i' as string]: i } as CSSProperties}>
          <span className="eb-line__in">
            {segs.map((s, j) => (
              <Seg key={j} seg={s} />
            ))}
          </span>
        </span>
      ))}
    </>
  )
}

/** Brazo superior del logo (barra naranja + punto amarillo), como marca. */
export function Arm({ height = 12, className = '' }: { height?: number; className?: string }) {
  return (
    <svg
      className={`eb-arm ${className}`}
      width={Math.round((43 / 14) * height)}
      height={height}
      viewBox="0 0 43 14"
      aria-hidden="true"
    >
      <rect width="38" height="14" fill="#D94A2B" />
      <circle cx="38" cy="7" r="5" fill="#F2C744" />
    </svg>
  )
}

/** Barra azul del logo (trapecio con corte a 45°). */
export function Trap({ height = 14, className = '' }: { height?: number; className?: string }) {
  return (
    <svg
      className={`eb-trap ${className}`}
      width={Math.round((30 / 14) * height)}
      height={height}
      viewBox="0 0 30 14"
      aria-hidden="true"
    >
      <path d="M0 0H30L16 14H0Z" fill="#2F5CB0" />
    </svg>
  )
}

/** Línea de folio: datos chicos en mono, repartidos a lo ancho. */
export function Folio({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  return (
    <p className={`eb-folio ${className}`}>
      {items.map((it, i) => (
        <span key={i}>{it}</span>
      ))}
    </p>
  )
}
