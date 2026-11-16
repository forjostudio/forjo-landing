import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { brandFontVars } from '@/components/landing/fonts'
import { ExplorerBar } from './_components/ExplorerBar'
import './explorations.css'

// Exploración visual 2.0: ruta aislada para comparar evoluciones de la landing.
// Las fuentes y los helpers de contenido son los mismos de la landing real
// (components/landing).

export const metadata: Metadata = {
  title: 'Exploración visual 2.0 — Forjo Studio',
  robots: { index: false, follow: false },
  // La página tiene su propio modo oscuro: Dark Reader y similares no la tocan.
  other: { 'darkreader-lock': 'true' },
}

// Recupera el tema elegido antes de pintar (sin parpadeo). "system" sigue a
// prefers-color-scheme desde el CSS.
const THEME_SCRIPT = `try{var t=localStorage.getItem('bx-theme');if(t==='light'||t==='dark')document.currentScript.parentElement.setAttribute('data-theme',t)}catch(e){}`

export default function ExplorationsLayout({ children }: { children: React.ReactNode }) {
  // Visible en local y en los previews de Vercel; en forjo.studio da 404.
  if (process.env.VERCEL_ENV === 'production') notFound()

  return (
    <div
      className={`bx ${brandFontVars}`}
      data-theme="system"
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      {children}
      <ExplorerBar />
    </div>
  )
}
