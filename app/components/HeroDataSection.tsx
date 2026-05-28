import Image from 'next/image'

export default function HeroDataSection() {
  return (
    <section className="relative w-full bg-surface-50 py-12 md:py-16">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-4 gap-8">
        {/* Texto a la izquierda en desktop, abajo en móvil */}
        <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 mb-3 leading-tight">
            La emoción es de los fans, la razón es de los datos.
          </h2>
          <p className="font-body text-base text-neutral-600 leading-relaxed">
            Los resultados históricos de la Liga MX, combinados con matemáticas,
            nos permiten anticipar los resultados de cada duelo.
          </p>
        </div>
        {/* Imagen a la derecha en desktop, arriba en móvil */}
        <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center md:justify-start">
          <Image
            src="/images/Imagen2.png"
            width={480}
            height={480}
            alt="Datos históricos y matemáticas en la Liga MX"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  )
}
