import { getContent } from '@/lib/content/get'
import { LandingEditor } from '@/components/admin/LandingEditor'

/** Editor de la landing: secciones a la izquierda, vista previa en vivo a la
 *  derecha. `?seccion=` abre una (ej. `?seccion=services`). */
export default async function EditorPage({ searchParams }: { searchParams: Promise<{ seccion?: string }> }) {
  const content = await getContent()
  const { seccion } = await searchParams
  return <LandingEditor initial={content} initialOpen={seccion && seccion in content ? seccion : undefined} />
}
