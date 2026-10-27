'use client'

import { useState, type FormEvent } from 'react'
import { submitLead } from '@/app/actions'

export function ContactForm({ title }: { title: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setState('sending')
    const res = await submitLead({ name, email, message })
    if (res?.error) {
      setState('error')
      return
    }
    setState('ok')
    setName('')
    setEmail('')
    setMessage('')
  }

  if (state === 'ok') {
    return (
      <div className="contact-form">
        <p className="contact-form-note" role="status">
          ¡Gracias! Te respondemos en menos de 24hs.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form-label">{title}</div>
      <label className="contact-form-field">
        Tu nombre
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <label className="contact-form-field">
        Tu email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>
      <label className="contact-form-field">
        Tu mensaje
        <textarea
          placeholder="Contanos en un par de líneas qué tenés en mente…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button className="contact-form-btn" disabled={state === 'sending'}>
        {state === 'sending' ? 'Enviando…' : 'Enviar mensaje →'}
      </button>
      {state === 'error' && (
        <p className="contact-form-note" role="alert">
          Hubo un error. Probá de nuevo o escribinos por WhatsApp.
        </p>
      )}
    </form>
  )
}
