import { adminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

interface Lead {
  id: string
  name: string | null
  email: string | null
  message: string
  created_at: string
}

export default async function MensajesPage() {
  const svc = adminClient()
  const { data } = await svc
    .from('landing_leads')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false })
  const leads = (data ?? []) as Lead[]

  return (
    <>
      <h1 className="adm-h1">Mensajes</h1>
      <p className="adm-sub">Consultas que llegan desde el formulario de la landing.</p>
      {leads.length === 0 ? (
        <p className="adm-empty">Todavía no hay mensajes.</p>
      ) : (
        leads.map((l) => (
          <div key={l.id} className="adm-lead">
            <div className="adm-lead-head">
              <span className="adm-lead-name">{l.name || 'Sin nombre'}</span>
              <span className="adm-lead-meta">
                {new Date(l.created_at).toLocaleString('es-AR')}
              </span>
            </div>
            {l.email && (
              <div className="adm-lead-meta" style={{ marginBottom: 8 }}>
                <a href={`mailto:${l.email}`}>{l.email}</a>
              </div>
            )}
            <div className="adm-lead-msg">{l.message}</div>
          </div>
        ))
      )}
    </>
  )
}
