import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Página "fuera de línea" (autocontenida) que se muestra cuando el sitio está
// suspendido. Editá el texto/colores libremente.
const SUSPENDED_HTML = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Fuera de línea</title>
<style>:root{--bg:#1a1714;--ink:#f3ead8;--muted:#a39989;--accent:#d94a2b}
*{margin:0;box-sizing:border-box}body{background:var(--bg);color:var(--ink);
font-family:system-ui,-apple-system,'Segoe UI',sans-serif;min-height:100vh;display:flex;
align-items:center;justify-content:center;padding:24px;text-align:center}
.card{max-width:460px}.logo{width:220px;max-width:72%;height:auto;margin:0 auto 30px;display:block}
h1{font-size:26px;letter-spacing:-.02em;margin-bottom:12px}
p{color:var(--muted);line-height:1.6;font-size:15px}</style></head>
<body><div class="card"><img class="logo" src="/forjo-studio-lockup.png" alt="Forjo Studio">
<h1>Sitio temporalmente fuera de línea</h1>
<p>Esta web está momentáneamente suspendida. Si sos el titular, contactá a tu proveedor para reactivarla.</p>
</div></body></html>`

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPanel = pathname.startsWith('/admin') || pathname.startsWith('/auth')

  // Kill switch: si el sitio está suspendido, las rutas PÚBLICAS devuelven 503
  // con la página de "fuera de línea". El panel (/admin) sigue accesible para
  // gestionar/exportar. Se prende con la env SITE_SUSPENDED=true (+ redeploy).
  if (!isPanel && process.env.SITE_SUSPENDED === 'true') {
    return new NextResponse(SUSPENDED_HTML, {
      status: 503,
      headers: { 'content-type': 'text/html; charset=utf-8', 'retry-after': '3600' },
    })
  }

  // Refresco de sesión de Supabase solo en el panel (para SSR auth).
  if (pathname.startsWith('/admin')) {
    let response = NextResponse.next({ request })
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(list) {
            list.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
          },
        },
      },
    )
    await supabase.auth.getUser()
    return response
  }

  return NextResponse.next({ request })
}

export const config = {
  // Corre en todo excepto assets estáticos (para poder cortar las rutas públicas).
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp|txt|xml|woff2?)$).*)',
  ],
}
