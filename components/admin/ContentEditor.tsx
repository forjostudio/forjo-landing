'use client'

import { useState } from 'react'
import { saveContent } from '@/app/admin/actions'
import { PALETTE, type LandingContent, type StyledSeg } from '@/lib/content/schema'

// Labels en español para las claves del contenido (fallback: la clave cruda).
const LABELS: Record<string, string> = {
  seo: 'SEO', nav: 'Navegación', hero: 'Portada', marquee: 'Marquesina',
  services: 'Servicios', turnos: 'Sistema de turnos', web: 'Sitios web',
  software: 'Software', process: 'Proceso', work: 'Trabajo', about: 'Nosotros',
  contact: 'Contacto', footer: 'Footer', plans: 'Planes', features: 'Características',
  tags: 'Etiquetas', included: 'Incluye', addons: 'Add-ons', steps: 'Pasos',
  projects: 'Proyectos', stats: 'Números', cols: 'Columnas', links: 'Enlaces',
  body: 'Párrafos',
  title: 'Título', description: 'Descripción', ogTitle: 'OG · título',
  ogDescription: 'OG · descripción', ogImage: 'OG · imagen (URL)', kicker: 'Volanta',
  sub: 'Subtítulo', intro: 'Intro', index: 'Índice', name: 'Nombre', price: 'Precio',
  unit: 'Unidad', badge: 'Etiqueta', featured: 'Destacado', ctaLabel: 'Botón · texto',
  ctaHref: 'Botón · link', label: 'Texto', href: 'Link', meta: 'Meta', desc: 'Descripción',
  key: 'Número', val: 'Etiqueta', cat: 'Categoría', year: 'Año', url: 'URL',
  thumb: 'Imagen (URL)', demoLabel: 'Botón demo', placeholders: 'Placeholders (cantidad)',
  note: 'Nota', includedLabel: 'Título "incluye"', addonsLabel: 'Título add-ons',
  paymentPre: 'Pago · inicio', paymentStrong: 'Pago · negrita', paymentPost: 'Pago · final',
  paymentLine2: 'Pago · línea 2', email: 'Email', whatsappLabel: 'WhatsApp · texto',
  whatsappHref: 'WhatsApp · link', callLabel: 'Llamada · texto', callHref: 'Llamada · link',
  formTitle: 'Título del formulario', boxLabel: 'Etiqueta de la caja',
  brandText: 'Texto de marca', copyright: 'Copyright', version: 'Versión',
  titleLine1: 'Título · línea 1', titleLine2: 'Título · línea 2',
  headlinePre: 'Titular · inicio', headlineAccent: 'Titular · acento',
  headlineMid: 'Titular · medio', headlineEm: 'Titular · itálica', headlinePost: 'Titular · final',
  headline1: 'Titular · línea 1', headline2: 'Titular · línea 2',
  ctaPrimaryLabel: 'CTA principal · texto', ctaPrimaryHref: 'CTA principal · link',
  ctaSecondaryLabel: 'CTA secundario · texto', ctaSecondaryHref: 'CTA secundario · link',
}
const label = (k: string) => LABELS[k] ?? k
const singular = (k: string) => (k.endsWith('s') ? k.slice(0, -1) : k)

const STYLE_KEYS = ['text', 'color', 'bold', 'italic', 'underline']
function isStyledSeg(v: unknown): v is StyledSeg {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false
  const o = v as Record<string, unknown>
  if (typeof o.text !== 'string') return false
  return Object.keys(o).every((k) => STYLE_KEYS.includes(k))
}

function blank(v: unknown): unknown {
  if (typeof v === 'string') return ''
  if (typeof v === 'boolean') return false
  if (typeof v === 'number') return 0
  if (Array.isArray(v)) return []
  if (v !== null && typeof v === 'object') {
    const o: Record<string, unknown> = {}
    for (const key of Object.keys(v as Record<string, unknown>))
      o[key] = blank((v as Record<string, unknown>)[key])
    return o
  }
  return ''
}

// ---- Texto con formato (color / itálica / subrayado) ----
function StyledTextField({
  k,
  value,
  onChange,
}: {
  k: string
  value: StyledSeg
  onChange: (v: StyledSeg) => void
}) {
  const set = (patch: Partial<StyledSeg>) => onChange({ ...value, ...patch })
  return (
    <div className="adm-field">
      <span className="adm-label">{label(k)}</span>
      <input className="adm-input" value={value.text} onChange={(e) => set({ text: e.target.value })} />
      <div className="adm-styled-toolbar">
        <button
          type="button"
          className={`adm-fmt adm-fmt--b ${value.bold ? 'is-on' : ''}`}
          onClick={() => set({ bold: !value.bold })}
          title="Negrita"
        >
          B
        </button>
        <button
          type="button"
          className={`adm-fmt adm-fmt--i ${value.italic ? 'is-on' : ''}`}
          onClick={() => set({ italic: !value.italic })}
          title="Itálica"
        >
          I
        </button>
        <button
          type="button"
          className={`adm-fmt adm-fmt--u ${value.underline ? 'is-on' : ''}`}
          onClick={() => set({ underline: !value.underline })}
          title="Subrayado"
        >
          U
        </button>
        <span className="adm-swatches">
          <button
            type="button"
            className={`adm-swatch adm-swatch--none ${!value.color ? 'is-on' : ''}`}
            onClick={() => set({ color: undefined })}
            title="Sin color (por defecto)"
          >
            ×
          </button>
          {PALETTE.map((p) => (
            <button
              key={p.value}
              type="button"
              title={p.name}
              onClick={() => set({ color: p.value })}
              className={`adm-swatch ${value.color === p.value ? 'is-on' : ''}`}
              style={{ background: p.value }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}

function FieldNode({
  k,
  value,
  onChange,
}: {
  k: string
  value: unknown
  onChange: (v: unknown) => void
}) {
  if (isStyledSeg(value)) {
    return <StyledTextField k={k} value={value} onChange={(v) => onChange(v)} />
  }
  if (typeof value === 'string') {
    const long = value.length > 55 || value.includes('\n')
    return (
      <label className="adm-field">
        <span className="adm-label">{label(k)}</span>
        {long ? (
          <textarea className="adm-input" rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input className="adm-input" value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </label>
    )
  }
  if (typeof value === 'boolean') {
    return (
      <label className="adm-check">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {label(k)}
      </label>
    )
  }
  if (typeof value === 'number') {
    return (
      <label className="adm-field">
        <span className="adm-label">{label(k)}</span>
        <input
          type="number"
          className="adm-input"
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        />
      </label>
    )
  }
  if (Array.isArray(value)) {
    return (
      <fieldset className="adm-group">
        <legend className="adm-legend">{label(k)}</legend>
        <ArrayItems k={k} value={value} onChange={(v) => onChange(v)} />
      </fieldset>
    )
  }
  if (value !== null && typeof value === 'object') {
    return (
      <fieldset className="adm-group">
        <legend className="adm-legend">{label(k)}</legend>
        <ObjectFields value={value as Record<string, unknown>} onChange={(v) => onChange(v)} />
      </fieldset>
    )
  }
  return null
}

function ObjectFields({
  value,
  onChange,
}: {
  value: Record<string, unknown>
  onChange: (v: Record<string, unknown>) => void
}) {
  return (
    <>
      {Object.keys(value).map((sub) => (
        <FieldNode
          key={sub}
          k={sub}
          value={value[sub]}
          onChange={(v) => onChange({ ...value, [sub]: v })}
        />
      ))}
    </>
  )
}

function ArrayItems({
  k,
  value,
  onChange,
}: {
  k: string
  value: unknown[]
  onChange: (v: unknown[]) => void
}) {
  const isStr = value.length === 0 || typeof value[0] === 'string'
  const add = () => onChange([...value, value.length ? blank(value[0]) : ''])
  return (
    <>
      {value.map((item, i) => (
        <div key={i} className="adm-item">
          <div className="adm-item-head">
            <span>
              {label(singular(k))} {i + 1}
            </span>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}>
              Quitar
            </button>
          </div>
          {isStr ? (
            <input
              className="adm-input"
              value={item as string}
              onChange={(e) => {
                const next = value.slice()
                next[i] = e.target.value
                onChange(next)
              }}
            />
          ) : (
            <FieldNode
              k={singular(k)}
              value={item}
              onChange={(v) => {
                const next = value.slice()
                next[i] = v
                onChange(next)
              }}
            />
          )}
        </div>
      ))}
      <button type="button" className="adm-add" onClick={add}>
        + Agregar {label(singular(k)).toLowerCase()}
      </button>
    </>
  )
}

// Cuerpo de una sección de nivel superior (sin fieldset: el título lo pone el accordion).
function SectionBody({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  if (Array.isArray(value)) {
    return <ArrayItems k="items" value={value} onChange={(v) => onChange(v)} />
  }
  if (value !== null && typeof value === 'object') {
    return (
      <ObjectFields value={value as Record<string, unknown>} onChange={(v) => onChange(v)} />
    )
  }
  return <FieldNode k="" value={value} onChange={onChange} />
}

const ORDER = ['seo', 'nav', 'hero', 'marquee', 'services', 'process', 'work', 'about', 'contact', 'footer']

export function ContentEditor({ initial }: { initial: LandingContent }) {
  const [content, setContent] = useState<Record<string, unknown>>(
    initial as unknown as Record<string, unknown>,
  )
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function onSave() {
    setSaving(true)
    setMsg('')
    const res = await saveContent(content as unknown as LandingContent)
    setSaving(false)
    setMsg(res?.error ? `Error: ${res.error}` : 'Guardado ✓')
  }

  return (
    <div className="adm-editor">
      {ORDER.map((k, i) => (
        <details key={k} className="adm-accordion" open={i === 0}>
          <summary className="adm-accordion-summary">{label(k)}</summary>
          <div className="adm-accordion-body">
            <SectionBody
              value={content[k]}
              onChange={(v) => setContent({ ...content, [k]: v })}
            />
          </div>
        </details>
      ))}
      <div className="adm-savebar">
        <button className="adm-btn adm-btn--primary" onClick={onSave} disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </button>
        {msg && <span className="adm-msg">{msg}</span>}
      </div>
    </div>
  )
}
