import { Suspense } from 'react'
import { Metadata } from 'next'
import Clausura2026Client from './Clausura2026Client'

export const metadata: Metadata = {
  title: 'Clausura 2026 — Pronóstico vs Realidad | SinColoresFC.mx',
  description:
    'Comparación entre las predicciones del modelo y los resultados reales del Clausura 2026 de la Liga MX.',
}

export default function Clausura2026Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div
            className="flex items-center justify-center py-20"
            aria-label="Cargando Clausura 2026"
            role="status"
          >
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Clausura2026Client />
      </Suspense>
    </div>
  )
}
