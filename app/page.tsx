import type { Metadata } from 'next'
import { Landing } from '@/components/Landing'
import { getContent } from '@/lib/content/get'

// La landing lee el contenido editable de la DB en cada request.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent()
  return {
    title: c.seo.title,
    description: c.seo.description,
    openGraph: {
      type: 'website',
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      url: 'https://forjo.studio/',
      siteName: 'Forjo Studio',
      locale: 'es_AR',
      images: [
        {
          url: c.seo.ogImage,
          width: 1200,
          height: 630,
          alt: 'Forjo Studio — estudio web independiente',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.seo.ogTitle,
      description: c.seo.ogDescription,
      images: [c.seo.ogImage],
    },
  }
}

export default async function Home() {
  return <Landing c={await getContent()} />
}
