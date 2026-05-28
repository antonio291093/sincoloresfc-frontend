import type { Metadata } from 'next'
import Link from 'next/link'
import DonationBanner from '@/app/components/DonationBanner'
import HeroFeatureSection from '@/app/components/HeroFeatureSection'
import HeroDataSection from '@/app/components/HeroDataSection'

export const metadata: Metadata = {
  title: 'Pronósticos Liga MX Clausura 2026 | SinColoresFC.mx',
  description:
    'Pronósticos para la Liga MX Clausura 2026 basados en estadísticas históricas. Registra tu quiniela y compara con la comunidad. Proyecto independiente, sin apuestas.',
  keywords: [
    'Liga MX',
    'pronósticos',
    'fútbol mexicano',
    'Clausura 2026',
    'quiniela',
    'estadísticas',
  ],
  openGraph: {
    title: 'Pronósticos Liga MX Clausura 2026 | SinColoresFC.mx',
    description:
      'Pronósticos para la Liga MX Clausura 2026 basados en estadísticas históricas. Registra tu quiniela y compara con la comunidad.',
    url: 'https://www.sincoloresfc.mx/',
    siteName: 'SinColoresFC.mx',
    images: [
      {
        url: 'https://res.cloudinary.com/dfpubv5hp/image/upload/v1752092838/banner_iwmrni.png',
        width: 1200,
        height: 630,
        alt: 'Pronósticos Liga MX Clausura 2026',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronósticos Liga MX Clausura 2026 | SinColoresFC.mx',
    description:
      'Pronósticos para la Liga MX Clausura 2026 basados en estadísticas históricas.',
    images: [
      'https://res.cloudinary.com/dfpubv5hp/image/upload/v1752092838/banner_iwmrni.png',
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default function HomePage() {
  return (
    <>
      {/* Banner de donación — visible en la parte superior de la página, debajo del Navbar */}
      <DonationBanner />

      {/* Hero principal */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3">
            La emoción es de los fans, la razón es de los datos.
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4 leading-tight">
            La Liga MX vista desde el lado frío de los números.
          </h1>
          <p className="font-body text-base md:text-lg text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Vive la pasión del fútbol mexicano con análisis y pronósticos
            exclusivos para cada jornada. Los resultados históricos combinados
            con matemáticas nos permiten anticipar los resultados de cada duelo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pronosticos"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-button)] bg-primary-600 text-white font-body font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm"
            >
              Ver pronósticos
            </Link>
            <Link
              href="/quiniela"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-button)] border border-neutral-300 bg-white text-neutral-700 font-body font-semibold text-sm hover:border-primary-500 hover:text-primary-700 transition-colors"
            >
              Registra tu quiniela
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones de valor con imágenes */}
      <HeroFeatureSection />
      <HeroDataSection />

      {/* Sección de características */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 text-center mb-10">
            ¿Qué encontrarás aquí?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-surface-50 rounded-[var(--radius-card)] p-6 border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                Análisis estadístico
              </h3>
              <p className="font-body text-sm text-neutral-600 leading-relaxed">
                Probabilidades calculadas con resultados históricos y forma
                reciente de cada equipo de la Liga MX.
              </p>
            </div>

            <div className="bg-surface-50 rounded-[var(--radius-card)] p-6 border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-gold-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                Tu quiniela
              </h3>
              <p className="font-body text-sm text-neutral-600 leading-relaxed">
                Registra tus predicciones de marcador antes de cada jornada y
                compáralas con el análisis de los datos.
              </p>
            </div>

            <div className="bg-surface-50 rounded-[var(--radius-card)] p-6 border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-accent-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                Comunidad
              </h3>
              <p className="font-body text-sm text-neutral-600 leading-relaxed">
                Mira qué predicen otros fans. Sin apuestas, sin cuotas. Solo el
                gusto por el análisis del fútbol mexicano.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
