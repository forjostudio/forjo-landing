// Las capturas de Trabajo pasan por next/image (WebP/AVIF y tamaño según
// pantalla). Las que se suben desde /admin viven en el Storage de Supabase:
// se habilita solo ese host (sale de la URL del proyecto, local o nube).
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL)
  : null

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: supabase
      ? [
          {
            protocol: supabase.protocol.replace(':', ''),
            hostname: supabase.hostname,
            port: supabase.port,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
}

export default nextConfig
