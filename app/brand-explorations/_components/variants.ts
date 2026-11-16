export const VARIANTS = [
  { id: 'a', letter: 'A', name: 'Technical Bold' },
  { id: 'b', letter: 'B', name: 'Creative Brutalism' },
  { id: 'c', letter: 'C', name: 'Digital Engineering' },
] as const

/** Las versiones editoriales brutalistas son copias evolucionadas de cada
 *  variante: /brand-explorations/a-eb, b-eb, c-eb. */
export const EDITORIAL = '-eb'

export function parseVariant(id: string) {
  const editorial = id.endsWith(EDITORIAL)
  const base = editorial ? id.slice(0, -EDITORIAL.length) : id
  const v = VARIANTS.find((x) => x.id === base)
  return v ? { ...v, editorial } : null
}
