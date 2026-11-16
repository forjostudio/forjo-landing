'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EDITORIAL, VARIANTS, parseVariant } from './variants'

type Theme = 'system' | 'light' | 'dark'
const NEXT: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' }
const LABEL: Record<Theme, string> = { system: 'Sistema', light: 'Claro', dark: 'Oscuro' }

/** Barra de la exploración: cambia entre A, B y C, entre la versión base y la
 *  editorial brutalista, y entre modo claro/oscuro. Es herramienta, no parte
 *  de ninguna variante. */
export function ExplorerBar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<Theme>('system')
  const current = parseVariant(pathname.split('/').pop() ?? '')
  const editorial = current?.editorial ?? false
  const letterId = current?.id ?? 'a'

  useEffect(() => {
    const t = document.querySelector('.bx')?.getAttribute('data-theme') as Theme | null
    if (t) setTheme(t)
  }, [])

  function cycleTheme() {
    const next = NEXT[theme]
    setTheme(next)
    document.querySelector('.bx')?.setAttribute('data-theme', next)
    try {
      if (next === 'system') localStorage.removeItem('bx-theme')
      else localStorage.setItem('bx-theme', next)
    } catch {}
  }

  const suffix = editorial ? EDITORIAL : ''

  return (
    <div className="bx-bar" role="region" aria-label="Exploración visual">
      <nav aria-label="Variantes">
        <ul className="bx-bar__list">
          <li>
            <Link
              href="/brand-explorations/final"
              className="bx-bar__item bx-bar__item--final"
              aria-current={pathname === '/brand-explorations/final' ? 'page' : undefined}
              title="Boceto final (A + B)"
            >
              Final
            </Link>
          </li>
          {VARIANTS.map((v) => {
            const href = `/brand-explorations/${v.id}${suffix}`
            const isCurrent = pathname === href
            return (
              <li key={v.id}>
                <Link
                  href={href}
                  className="bx-bar__item"
                  aria-current={isCurrent ? 'page' : undefined}
                  title={`${v.letter} · ${v.name}${editorial ? ' (editorial)' : ''}`}
                >
                  <span className="bx-bar__letter">{v.letter}</span>
                  <span className="bx-bar__name">{v.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Link
        href={`/brand-explorations/${letterId}${editorial ? '' : EDITORIAL}`}
        className="bx-bar__eb"
        role="switch"
        aria-checked={editorial}
        title="Versión editorial brutalista"
      >
        <span className="bx-bar__eb-track" aria-hidden="true">
          <span className="bx-bar__eb-knob" />
        </span>
        <span className="bx-bar__eb-label">Editorial</span>
      </Link>
      <button type="button" className="bx-bar__theme" onClick={cycleTheme} aria-label={`Tema: ${LABEL[theme]}. Cambiar`}>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {theme !== 'light' && <path d="M9 1.5a7.5 7.5 0 0 1 0 15Z" fill="currentColor" />}
          {theme === 'dark' && <path d="M9 1.5a7.5 7.5 0 0 0 0 15Z" fill="currentColor" />}
        </svg>
        <span className="bx-bar__theme-label">{LABEL[theme]}</span>
      </button>
    </div>
  )
}
