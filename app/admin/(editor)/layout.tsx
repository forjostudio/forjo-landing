import '../admin.css'
import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Editor · Forjo', robots: { index: false, follow: false } }

/** Pantallas del editor: a pantalla completa, sin el marco del panel. */
export default async function EditorLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return children
}
