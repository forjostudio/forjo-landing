import { createClient } from '@supabase/supabase-js'

/** Cliente anónimo para lecturas públicas (contenido de la landing). Sin sesión. */
export function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}
