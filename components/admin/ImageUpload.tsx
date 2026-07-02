'use client'

import { useState, type ChangeEvent } from 'react'
import { uploadImage } from '@/app/admin/actions'

/** Campo de imagen: sube al Storage y guarda la URL. También acepta pegar una URL. */
export function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setErr(null)
    const fd = new FormData()
    fd.append('file', file)
    const res = await uploadImage(fd)
    setBusy(false)
    e.target.value = ''
    if (res.error) {
      setErr(res.error)
      return
    }
    if (res.url) onChange(res.url)
  }

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      <div className="adm-imgrow">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="adm-thumb" />
        ) : (
          <div className="adm-thumb adm-thumb--empty">sin imagen</div>
        )}
        <div className="adm-imgcol">
          <label className="adm-upload">
            {busy ? 'Subiendo…' : 'Subir imagen'}
            <input type="file" accept="image/*" onChange={onFile} disabled={busy} hidden />
          </label>
          <input
            className="adm-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="o pegá una URL"
          />
        </div>
      </div>
      {err && <div className="adm-err">{err}</div>}
    </div>
  )
}
