import type { Metadata } from 'next'
import { Archivo, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Mismas familias que la landing original; self-hosted por next/font (sin CLS).
// Los nombres de variable se enganchan a los tokens --font-* del CSS.
const archivo = Archivo({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://forjo.studio'),
  title: 'Forjamos tu presencia en la web. — Forjo Studio',
  description:
    'Estudio web independiente. Diseño y desarrollo a medida para emprendedores, profesionales y marcas que necesitan más que un template.',
  authors: [{ name: 'Forjo Studio' }],
  alternates: { canonical: 'https://forjo.studio/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  // title/description + Open Graph/Twitter los define la página desde el
  // contenido editable (app/page.tsx → generateMetadata).
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://forjo.studio/#business',
      name: 'Forjo Studio',
      description:
        'Estudio web independiente. Sistema de turnos, catálogos online con pedidos por WhatsApp, tiendas en Tienda Nube, webs profesionales y software a medida para emprendedores, profesionales y marcas.',
      url: 'https://forjo.studio/',
      email: 'hola@forjo.studio',
      telephone: '+5493487623630',
      image: 'https://forjo.studio/apple-touch-icon.png',
      logo: 'https://forjo.studio/apple-touch-icon.png',
      priceRange: '$$',
      foundingDate: '2025',
      areaServed: 'AR',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR',
      },
      sameAs: ['https://www.instagram.com/forjo.studio'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://forjo.studio/#website',
      name: 'Forjo Studio',
      url: 'https://forjo.studio/',
      description: 'Estudio web independiente. Sistemas de turnos, tiendas online y sitios web a medida.',
      inLanguage: 'es-AR',
      publisher: { '@id': 'https://forjo.studio/#business' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </body>
    </html>
  )
}
