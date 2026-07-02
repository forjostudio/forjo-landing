'use server'

import { revalidatePath } from 'next/cache'
import { getAdmin } from '@/lib/admin/auth'
import { adminClient } from '@/lib/supabase/admin'
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
