import { publicClient } from '@/lib/supabase/public'
import { DEFAULT_CONTENT, type LandingContent } from './schema'

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
    return deepMerge(DEFAULT_CONTENT, coerceStyledSegs(data?.data))
  } catch {
    return DEFAULT_CONTENT
  }
}
