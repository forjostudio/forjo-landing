import { getContent } from '@/lib/content/get'
import { ContentEditor } from '@/components/admin/ContentEditor'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const content = await getContent()
  return (
    <>
      <h1 className="adm-h1">Contenido</h1>
      <p className="adm-sub">
        Editá textos, precios y SEO de la landing. Al guardar, los cambios se ven al instante.
      </p>
      <ContentEditor initial={content} />
    </>
  )
}
