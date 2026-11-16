import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/content/get'
import { parseVariant } from '../_components/variants'
import { VariantA } from '../_components/VariantA'
import { VariantB } from '../_components/VariantB'
import { VariantC } from '../_components/VariantC'
import { VariantAE } from '../_components/VariantAE'
import { VariantBE } from '../_components/VariantBE'
import { VariantCE } from '../_components/VariantCE'
import { VariantFinal } from '../_components/VariantFinal'

// Mismo contenido que la landing: lo editado en el panel se ve acá también.
export const dynamic = 'force-dynamic'

const RENDER = {
  a: VariantA,
  b: VariantB,
  c: VariantC,
  'a-eb': VariantAE,
  'b-eb': VariantBE,
  'c-eb': VariantCE,
  final: VariantFinal,
} as const

type Params = { params: Promise<{ variant: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { variant } = await params
  if (variant === 'final') return { title: 'Boceto final (A + B) — Exploración visual 2.0' }
  const v = parseVariant(variant)
  if (!v) return {}
  return {
    title: `${v.letter}${v.editorial ? ' editorial' : ''} · ${v.name} — Exploración visual 2.0`,
  }
}

export default async function VariantPage({ params }: Params) {
  const { variant } = await params
  if (!(variant in RENDER)) notFound()
  const Render = RENDER[variant as keyof typeof RENDER]
  return <Render c={await getContent()} />
}
