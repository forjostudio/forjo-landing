import { createClient } from '@supabase/supabase-js'

/** Cliente con service_role: bypassa RLS. Solo en el servidor, para operaciones
 *  de admin (escribir contenido, leer leads) tras verificar el email admin. */
export function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}
