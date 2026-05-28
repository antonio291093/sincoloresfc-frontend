import type { Metadata } from 'next'
import ContactoForm from './ContactoForm'

export const metadata: Metadata = {
  title: 'Contacto | SinColoresFC.mx',
  description:
    'Ponte en contacto con el equipo de SinColoresFC.mx para dudas, sugerencias o ejercicio de derechos.',
}

export default function ContactoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
        Contacto
      </h1>
      <p className="font-body text-neutral-700 mb-8 leading-relaxed">
        ¿Tienes dudas o sugerencias? Escríbenos directamente a{' '}
        <a
          href="mailto:contacto@sincoloresfc.mx"
          className="text-primary-600 underline hover:text-primary-700 transition-colors"
        >
          contacto@sincoloresfc.mx
        </a>{' '}
        o completa el siguiente formulario:
      </p>

      <ContactoForm />

      <p className="mt-10 font-body text-sm text-neutral-500">
        También puedes contactarnos por nuestras redes sociales oficiales.
      </p>
    </article>
  )
}
