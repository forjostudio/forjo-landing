'use server'

import { adminClient } from '@/lib/supabase/admin'

/** Guarda un lead del formulario público de contacto en landing_leads. */
export async function submitLead(input: {
  name?: string
  email?: string
  message: string
}): Promise<{ ok?: true; error?: string }> {
  const message = (input.message || '').trim()
  if (!message) return { error: 'Escribí un mensaje.' }

  const svc = adminClient()
  const { error } = await svc.from('landing_leads').insert({
    name: input.name?.trim() || null,
    email: input.email?.trim() || null,
    message,
    source: 'landing',
  })
  if (error) return { error: error.message }
  return { ok: true }
}
