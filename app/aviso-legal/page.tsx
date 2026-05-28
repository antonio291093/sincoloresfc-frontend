import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | SinColoresFC.mx',
  description:
    'Consulta el aviso legal y las condiciones de uso de SinColoresFC.mx.',
}

export default function AvisoLegal() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-6">
        Aviso Legal
      </h1>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Titular del sitio web
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        <strong>SinColoresFC.mx</strong>
        <br />
        Email de contacto:{' '}
        <a
          href="mailto:contacto@sincoloresfc.mx"
          className="text-primary-600 underline hover:text-primary-700 transition-colors"
        >
          contacto@sincoloresfc.mx
        </a>
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Objeto
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Este sitio web tiene como finalidad ofrecer información, análisis y
        pronósticos sobre la Liga MX. El contenido es meramente informativo y no
        constituye asesoramiento profesional.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Propiedad intelectual
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Todos los contenidos, textos, imágenes y logotipos son propiedad de
        SinColoresFC.mx o de sus respectivos titulares y están protegidos por la
        legislación vigente.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Limitación de responsabilidad
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        SinColoresFC.mx no garantiza la exactitud de los pronósticos publicados
        ni se responsabiliza por las decisiones tomadas por los usuarios basadas
        en la información del sitio.
      </p>

      <h2 className="font-display font-bold text-xl text-neutral-900 mt-8 mb-3">
        Legislación aplicable
      </h2>
      <p className="font-body text-neutral-700 mb-6 leading-relaxed">
        Este sitio se rige por la legislación mexicana. Para cualquier
        controversia, las partes se someten a los juzgados y tribunales de
        México.
      </p>

      <p className="mt-10 font-body text-sm text-neutral-500">
        Última actualización: mayo de 2026
      </p>
    </article>
  )
}
