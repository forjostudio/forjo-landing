// Semilla el contenido de la landing en landing_content (id='forjo') con el
// DEFAULT_CONTENT (el contenido actual). Idempotente (upsert).
//   npx tsx scripts/seed.mts
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'
import { DEFAULT_CONTENT } from '../lib/content/schema'

const env: Record<string, string> = {}
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim().replace(/^"|"$/g, '')
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const { error } = await supabase
  .from('landing_content')
  .upsert({ id: 'forjo', data: DEFAULT_CONTENT, updated_at: new Date().toISOString() })

if (error) {
  console.error('Error al semillar:', error.message)
  process.exit(1)
}
console.log('✓ landing_content sembrado (id=forjo)')
