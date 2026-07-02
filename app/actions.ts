'use server'

import { adminClient } from '@/lib/supabase/admin'

/** Aviso por mail de un lead nuevo (best-effort; requiere RESEND_API_KEY +
 *  LANDING_NOTIFY_EMAIL). Si no están seteados, no hace nada. */
async function notifyLead(input: { name?: string; email?: string; message: string }) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.LANDING_NOTIFY_EMAIL
  if (!key || !to) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Forjo Landing <no-reply@forjo.studio>',
      to: [to],
      reply_to: input.email || undefined,
      subject: `Nuevo mensaje de la web${input.name ? ` — ${input.name}` : ''}`,
      text: `Nombre: ${input.name || '-'}\nEmail: ${input.email || '-'}\n\nMensaje:\n${input.message}`,
    }),
  })
}

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

  try {
    await notifyLead({ name: input.name, email: input.email, message })
  } catch {
    // El aviso por mail es best-effort: el lead ya quedó guardado.
  }
  return { ok: true }
}
