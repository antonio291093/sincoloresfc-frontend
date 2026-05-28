import Image from 'next/image'

export default function HeroFeatureSection() {
  return (
    <section className="relative w-full bg-white py-12 md:py-16">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-4 gap-8">
        {/* Imagen a la izquierda */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/images/Imagen1.png"
            width={480}
            height={480}
            alt="Análisis estadístico de la Liga MX"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>
        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-3 leading-tight">
            La Liga MX vista desde el lado frío de los números.
          </h2>
          <p className="font-body text-base text-neutral-600 leading-relaxed">
            Vive la pasión del fútbol mexicano con análisis y pronósticos
            exclusivos para cada jornada.
          </p>
        </div>
      </div>
    </section>
  )
}
