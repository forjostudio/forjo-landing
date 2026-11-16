// Correcciones de contenido de la landing (noviembre 2026, rediseño 2.0):
//  - Sitios web: "Desde $180.000 · según alcance · efectivo o transferencia",
//    sin precio tachado.
//  - Software a medida: "Cotización según proyecto" pasa a la descripción y
//    suma el botón Cotizar.
//  - Comisión: el "sin comisión" vale solo para efectivo o transferencia
//    (los pagos online tienen comisión). Sale el dato 0% de Nosotros.
//
// Idempotente. Por defecto solo muestra lo que cambiaría.
//   node scripts/content-2026-11.mjs [--env <archivo .env>] [--apply] [--backup <archivo.json>]
import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const args = process.argv.slice(2)
const arg = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const envFile = arg('--env') ?? '.env.local'
const apply = args.includes('--apply')
const backup = arg('--backup')

const env = {}
for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim().replace(/^"|"$/g, '')
}
if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(`Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en ${envFile}`)
  process.exit(1)
}
console.log('Base:', new URL(env.NEXT_PUBLIC_SUPABASE_URL).host)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const { data: row, error } = await supabase.from('landing_content').select('data').eq('id', 'forjo').maybeSingle()
if (error) {
  console.error('Error al leer:', error.message)
  process.exit(1)
}
if (!row?.data) {
  console.log('No hay contenido guardado: la landing usa los valores por defecto del código (ya corregidos).')
  process.exit(0)
}

const original = row.data
const data = structuredClone(original)
const changes = []

const NO_COMMISSION_TAG = 'Sin comisión en efectivo o transferencia'
const NO_COMMISSION_NOTE =
  'Lo que cobrás en efectivo o por transferencia es todo tuyo: Forjo no se lleva un porcentaje. Los pagos online tienen comisión.'
const OLD_NOTE = /Lo que vend[eé]s es tuyo: Forjo no se lleva un porcentaje\.(\s*Si sum[aá]s Mercado Pago, la comisi[oó]n es de ellos\.)?/i

const items = data.services?.items
if (Array.isArray(items)) {
  for (const it of items) {
    const title = String(it.title ?? '').trim().toLowerCase()
    if (Array.isArray(it.tags)) {
      it.tags = it.tags.map((t) => {
        if (/sin comisi/i.test(t) && t !== NO_COMMISSION_TAG) {
          changes.push(`${it.title}: tag "${t}" → "${NO_COMMISSION_TAG}"`)
          return NO_COMMISSION_TAG
        }
        return t
      })
    }
    if (typeof it.footnote === 'string' && OLD_NOTE.test(it.footnote)) {
      it.footnote = it.footnote.replace(OLD_NOTE, NO_COMMISSION_NOTE)
      changes.push(`${it.title}: nota al pie de comisión actualizada`)
    }
    if (title.startsWith('sitios web') && it.price && !/^desde/i.test(it.price)) {
      changes.push(`${it.title}: precio "${it.priceOld} ${it.price} ${it.priceNote}" → "Desde ${it.price} según alcance · efectivo o transferencia"`)
      it.priceOld = ''
      it.price = `Desde ${it.price}`
      it.priceNote = 'según alcance · efectivo o transferencia'
    }
    if (title.startsWith('software a medida') && it.price && !(it.plans?.length > 0)) {
      const sentence = String(it.price).trim().replace(/\.?$/, '.')
      it.desc = `${String(it.desc ?? '').trim()} ${sentence}`
      changes.push(`${it.title}: "${it.price}" pasa a la descripción + botón Cotizar`)
      it.price = ''
      it.ctaLabel = it.ctaLabel || 'Cotizar →'
      it.ctaHref = it.ctaHref || '#contacto'
    }
  }
}

if (Array.isArray(data.about?.stats)) {
  const before = data.about.stats.length
  data.about.stats = data.about.stats.filter((s) => String(s.key ?? '').replace(/\s/g, '') !== '0%')
  if (data.about.stats.length !== before) changes.push('Nosotros: sale el dato 0%')
}

if (!changes.length) {
  console.log('Nada para cambiar: el contenido ya está corregido.')
  process.exit(0)
}
console.log('Cambios:\n - ' + changes.join('\n - '))
if (!apply) {
  console.log('\n(Simulación. Agregá --apply para escribir.)')
  process.exit(0)
}

if (backup) {
  writeFileSync(backup, JSON.stringify(original, null, 2))
  console.log('Copia del contenido original en', backup)
}
const { error: upErr } = await supabase
  .from('landing_content')
  .update({ data, updated_at: new Date().toISOString() })
  .eq('id', 'forjo')
if (upErr) {
  console.error('Error al escribir:', upErr.message)
  process.exit(1)
}
console.log('✓ Contenido actualizado')
