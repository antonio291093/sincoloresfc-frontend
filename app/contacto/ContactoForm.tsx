'use client'
import { useState, type FormEvent } from 'react'

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

export default function ContactoForm() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  })

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState({ status: 'submitting', message: '' })

    const form = e.currentTarget
    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value

    // Envío via mailto como fallback — el backend puede integrarse después
    const mailtoLink = `mailto:contacto@sincoloresfc.mx?subject=Contacto de ${encodeURIComponent(nombre)}&body=${encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`)}`
    window.location.href = mailtoLink

    setFormState({
      status: 'success',
      message: 'Se abrió tu cliente de correo. ¡Gracias por escribirnos!',
    })
    form.reset()
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className="space-y-5 max-w-md"
      noValidate
    >
      <div>
        <label
          htmlFor="nombre"
          className="block mb-1 font-body font-semibold text-sm text-neutral-700"
        >
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full border border-neutral-300 rounded-[var(--radius-input)] px-3 py-2 font-body text-sm text-neutral-900 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-1 font-body font-semibold text-sm text-neutral-700"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-neutral-300 rounded-[var(--radius-input)] px-3 py-2 font-body text-sm text-neutral-900 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="mensaje"
          className="block mb-1 font-body font-semibold text-sm text-neutral-700"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          required
          className="w-full border border-neutral-300 rounded-[var(--radius-input)] px-3 py-2 font-body text-sm text-neutral-900 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition resize-y"
        />
      </div>

      {formState.status === 'success' && (
        <p
          role="status"
          className="font-body text-sm text-success-700 bg-success-50 border border-success-100 rounded-[var(--radius-badge)] px-3 py-2"
        >
          {formState.message}
        </p>
      )}

      <button
        type="submit"
        disabled={formState.status === 'submitting'}
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-button)] bg-primary-600 text-white font-body font-semibold text-sm hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {formState.status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
