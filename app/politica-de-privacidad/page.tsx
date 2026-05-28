import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | SinColoresFC.mx',
  description:
    'Conoce cómo protegemos y tratamos tus datos personales en SinColoresFC.mx.',
}

export default function PoliticaDePrivacidad() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-6">
        Política de Privacidad
      </h1>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        En <strong>SinColoresFC.mx</strong> nos comprometemos a proteger tu
        privacidad. Esta política explica qué datos personales recopilamos, cómo
        los usamos y tus derechos sobre ellos.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Datos que recopilamos
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 font-body text-neutral-700">
        <li>
          Datos de navegación: dirección IP, tipo de navegador, páginas
          visitadas.
        </li>
        <li>
          Cookies y tecnologías similares para análisis y publicidad
          personalizada (Google AdSense).
        </li>
        <li>Datos proporcionados por el usuario en formularios de contacto.</li>
      </ul>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Uso de los datos
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 font-body text-neutral-700">
        <li>Mejorar la experiencia de usuario y el funcionamiento del sitio.</li>
        <li>Mostrar anuncios personalizados a través de Google AdSense.</li>
        <li>Responder consultas o solicitudes enviadas por el usuario.</li>
      </ul>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Compartición de datos
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Podemos compartir datos con servicios de terceros como Google para fines
        de análisis y publicidad. Consulta la{' '}
        <a
          href="https://policies.google.com/privacy?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline hover:text-primary-700 transition-colors"
        >
          Política de Privacidad de Google
        </a>
        .
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Tus derechos
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Puedes ejercer tus derechos de acceso, rectificación o eliminación de
        tus datos escribiéndonos a{' '}
        <a
          href="mailto:contacto@sincoloresfc.mx"
          className="text-primary-600 underline hover:text-primary-700 transition-colors"
        >
          contacto@sincoloresfc.mx
        </a>
        .
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Cambios en la política
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Nos reservamos el derecho de modificar esta política para adaptarla a
        novedades legislativas o prácticas del sector. Consulta esta página
        regularmente.
      </p>

      <p className="mt-10 font-body text-sm text-neutral-500">
        Última actualización: mayo de 2026
      </p>
    </article>
  )
}
