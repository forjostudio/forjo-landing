'use client'

import { useState, type FormEvent } from 'react'
import { updatePassword } from '@/app/admin/actions'

export function ChangePassword() {
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [state, setState] = useState<'idle' | 'saving' | 'ok'>('idle')
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setErr(null)
    if (pass.length < 6) {
      setErr('Mínimo 6 caracteres.')
      return
    }
    if (pass !== pass2) {
      setErr('Las contraseñas no coinciden.')
      return
    }
    setState('saving')
    const res = await updatePassword(pass)
    if (res?.error) {
      setState('idle')
      setErr(res.error)
      return
    }
    setState('ok')
    setPass('')
    setPass2('')
  }

  return (
    <form className="adm-group" onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      <label className="adm-field">
        <span className="adm-label">Nueva contraseña</span>
        <input
          className="adm-input"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <label className="adm-field">
        <span className="adm-label">Repetir contraseña</span>
        <input
          className="adm-input"
          type="password"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      {err && <div className="adm-err">{err}</div>}
      <div>
        <button className="adm-btn adm-btn--primary" disabled={state === 'saving'}>
          {state === 'saving' ? 'Guardando…' : 'Cambiar contraseña'}
        </button>
        {state === 'ok' && <span className="adm-msg" style={{ marginLeft: 12 }}>Contraseña actualizada ✓</span>}
      </div>
    </form>
  )
}
