'use server'

import { revalidatePath } from 'next/cache'
import { getAdmin } from '@/lib/admin/auth'
import { adminClient } from '@/lib/supabase/admin'
import { serverClient } from '@/lib/supabase/server'
import type { LandingContent } from '@/lib/content/schema'

/** Guarda el contenido de la landing (solo admin, vía service_role). */
export async function saveContent(content: LandingContent): Promise<{ ok?: true; error?: string }> {
  const user = await getAdmin()
  if (!user) return { error: 'No autorizado' }

  const svc = adminClient()
  const { error } = await svc
    .from('landing_content')
    .upsert({ id: 'forjo', data: content, updated_at: new Date().toISOString() })

  if (error) return { error: error.message }
  revalidatePath('/')
  return { ok: true }
}

/** Sube una imagen al bucket landing-assets (service_role) y devuelve su URL pública. */
export async function uploadImage(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const user = await getAdmin()
  if (!user) return { error: 'No autorizado' }
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) return { error: 'Archivo inválido' }
  if (file.size > 5 * 1024 * 1024) return { error: 'Máximo 5 MB' }

  const svc = adminClient()
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await svc.storage
    .from('landing-assets')
    .upload(path, file, { contentType: file.type, upsert: false })
  if (error) return { error: error.message }
  const { data } = svc.storage.from('landing-assets').getPublicUrl(path)
  return { url: data.publicUrl }
}

/** Cambia la contraseña del admin logueado. */
export async function updatePassword(
  password: string,
): Promise<{ ok?: true; error?: string }> {
  const user = await getAdmin()
  if (!user) return { error: 'No autorizado' }
  if (!password || password.length < 6) return { error: 'Mínimo 6 caracteres.' }

  const supabase = await serverClient()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }
  return { ok: true }
}
