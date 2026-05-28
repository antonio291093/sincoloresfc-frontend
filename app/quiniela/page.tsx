import type { Metadata } from 'next'
import QuinielaClient from './QuinielaClient'

export const metadata: Metadata = {
  title: 'Registra tu quiniela',
  description:
    'Registra tus pronósticos para la jornada de la Liga MX y compara con el modelo estadístico y la comunidad.',
}

export default function QuinielaPage() {
  return <QuinielaClient />
}
