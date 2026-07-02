import { redirect } from 'next/navigation'
import { serverClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/** Devuelve el usuario logueado si es el admin de la landing; si no, null. */
export async function getAdmin(): Promise<User | null> {
  const supabase = await serverClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const adminEmail = process.env.LANDING_ADMIN_EMAIL?.toLowerCase()
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) return null
  return user
}

/** Igual que getAdmin pero redirige al login si no es el admin. */
export async function requireAdmin(): Promise<User> {
  const user = await getAdmin()
  if (!user) redirect('/admin/login')
  return user
}
