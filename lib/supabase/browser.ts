import { createBrowserClient } from '@supabase/ssr'

/** Cliente de navegador (login del panel). Respeta la sesión vía cookies. */
export function browserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
