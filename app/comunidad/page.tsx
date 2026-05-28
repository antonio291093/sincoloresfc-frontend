import type { Metadata } from 'next'
import ComunidadClient from './ComunidadClient'

export const metadata: Metadata = {
  title: 'Así lo vio la comunidad',
  description:
    'Compara los pronósticos de la comunidad con el modelo estadístico de SinColoresFC.mx para cada jornada de la Liga MX.',
}

export default function ComunidadPage() {
  return <ComunidadClient />
}
