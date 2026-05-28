import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | SinColoresFC.mx',
  description: 'Conoce cómo y para qué usamos cookies en SinColoresFC.mx.',
}

export default function PoliticaDeCookies() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-6">
        Política de Cookies
      </h1>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        En <strong>SinColoresFC.mx</strong> utilizamos cookies propias y de
        terceros para mejorar tu experiencia, analizar el tráfico y mostrarte
        anuncios personalizados mediante Google AdSense.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        ¿Qué son las cookies?
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Las cookies son pequeños archivos que se almacenan en tu dispositivo al
        navegar por internet. Permiten recordar tus preferencias y personalizar
        el contenido.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Tipos de cookies que usamos
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 font-body text-neutral-700">
        <li>
          <strong>Cookies técnicas:</strong> necesarias para el funcionamiento
          del sitio.
        </li>
        <li>
          <strong>Cookies analíticas:</strong> nos ayudan a entender cómo usas
          el sitio (Google Analytics).
        </li>
        <li>
          <strong>Cookies publicitarias:</strong> muestran anuncios relevantes
          (Google AdSense).
        </li>
      </ul>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Cookies de terceros
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Usamos servicios de Google que pueden instalar cookies en tu
        dispositivo. Consulta la{' '}
        <a
          href="https://policies.google.com/technologies/cookies?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline hover:text-primary-700 transition-colors"
        >
          Política de Cookies de Google
        </a>{' '}
        para más información.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        ¿Cómo gestionar las cookies?
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Puedes configurar tu navegador para aceptar, rechazar o eliminar cookies
        en cualquier momento. Ten en cuenta que algunas funciones pueden verse
        afectadas si desactivas las cookies.
      </p>

      <p className="mt-10 font-body text-sm text-neutral-500">
        Última actualización: mayo de 2026
      </p>
    </article>
  )
}
