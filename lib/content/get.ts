import { publicClient } from '@/lib/supabase/public'
import { CONTENT_VERSION, DEFAULT_CONTENT, type LandingContent } from './schema'

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/** Merge profundo: los objetos se combinan, los arrays y escalares del override
 *  reemplazan. Así, campos nuevos en el código caen al default y lo guardado gana. */
function deepMerge<T>(base: T, over: unknown): T {
  if (!isObj(over)) return base
  if (!isObj(base)) return over as T
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const k of Object.keys(over)) {
    const b = (base as Record<string, unknown>)[k]
    const o = (over as Record<string, unknown>)[k]
    out[k] = isObj(b) && isObj(o) ? deepMerge(b, o) : o
  }
  return out as T
}

// Campos que pasaron de string a segmento con estilo (StyledSeg). Si en la DB
// están guardados como string (formato viejo), los envolvemos en { text } para
// que el merge conserve el estilo por defecto y el texto guardado.
const STYLED_PATHS: [string, string[]][] = [
  ['hero', ['headlinePre', 'headlineAccent', 'headlineMid', 'headlineEm', 'headlinePost']],
  ['about', ['headlinePre', 'headlineMid', 'headlineEm', 'headlinePost']],
  ['contact', ['headline1', 'headline2']],
]

function coerceStyledSegs(data: unknown): unknown {
  if (!isObj(data)) return data
  const out = { ...data }
  for (const [section, keys] of STYLED_PATHS) {
    const sec = out[section]
    if (!isObj(sec)) continue
    const next = { ...sec }
    for (const k of keys) {
      if (typeof next[k] === 'string') next[k] = { text: next[k] }
    }
    out[section] = next
  }
  return out
}

// v1 → v2: servicios pasó de 3 lugares fijos (turnos/web/software) a una lista,
// con productos y precios nuevos. Lo guardado de servicios, la marquesina y la
// OG description quedan obsoletos: se descartan para que caigan al default. A
// trabajos se le suma Agualaboca sin pisar los proyectos ya cargados.
function migrate(data: unknown): unknown {
  if (!isObj(data)) return data
  if (typeof data.schemaVersion === 'number' && data.schemaVersion >= CONTENT_VERSION) return data
  const out: Record<string, unknown> = { ...data, schemaVersion: CONTENT_VERSION }
  delete out.services
  delete out.marquee
  if (isObj(out.seo)) {
    const seo = { ...out.seo }
    delete seo.ogDescription
    out.seo = seo
  }
  const work = out.work
  if (isObj(work) && Array.isArray(work.projects)) {
    const newProject = DEFAULT_CONTENT.work.projects[0]
    const has = work.projects.some((p) => isObj(p) && p.name === newProject.name)
    if (!has) {
      const ph = typeof work.placeholders === 'number' ? work.placeholders : 0
      out.work = {
        ...work,
        projects: [newProject, ...work.projects],
        placeholders: Math.max(0, ph - 1),
      }
    }
  }
  return out
}

/** Contenido de la landing: lo guardado en DB mergeado sobre el default. Si no
 *  hay fila o falla la lectura, devuelve el default (la landing se ve igual). */
export async function getContent(): Promise<LandingContent> {
  try {
    const supabase = publicClient()
    const { data } = await supabase
      .from('landing_content')
      .select('data')
      .eq('id', 'forjo')
      .maybeSingle()
    return deepMerge(DEFAULT_CONTENT, migrate(coerceStyledSegs(data?.data)))
  } catch {
    return DEFAULT_CONTENT
  }
}
