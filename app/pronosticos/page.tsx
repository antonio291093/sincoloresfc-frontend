import type { Metadata } from 'next'
import PronosticosClient from './PronosticosClient'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ jornada?: string }>
}): Promise<Metadata> {
  const { jornada } = await searchParams
  const titulo = jornada
    ? `Pronósticos Jornada ${jornada}`
    : 'Pronósticos de la jornada'

  return {
    title: titulo,
    description: `Pronósticos estadísticos para la jornada ${jornada ?? 'actual'} de la Liga MX Apertura 2025.`,
  }
}

export default async function PronosticosPage({
  searchParams,
}: {
  searchParams: Promise<{ jornada?: string }>
}) {
  const { jornada } = await searchParams

  return (
    <PronosticosClient jornadaParam={jornada} />
  )
}
