import '../admin.css'
import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="adm-shell">
      <div className="adm-topbar">
        <span className="adm-brand">Forjo · Panel</span>
        <nav className="adm-nav">
          <Link href="/admin">Contenido</Link>
          <Link href="/admin/mensajes">Mensajes</Link>
          <Link href="/admin/cuenta">Cuenta</Link>
          <a href="/" target="_blank" rel="noopener">
            Ver landing ↗
          </a>
          <form action="/auth/signout" method="post">
            <button type="submit" className="adm-linkbtn">
              Salir
            </button>
          </form>
        </nav>
      </div>
      <main className="adm-main">{children}</main>
    </div>
  )
}
