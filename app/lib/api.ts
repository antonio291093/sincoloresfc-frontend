import type { Jornada, PronosticoComunidad } from '@/app/types'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

export async function getJornadas(): Promise<Jornada[]> {
  const res = await fetch(`${API}/api/jornadas`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`getJornadas: HTTP ${res.status}`)
  return res.json()
}

export async function getJornada(numero: number): Promise<Jornada> {
  const res = await fetch(`${API}/api/jornadas/${numero}`, {
    next: { revalidate: 30 },
  })
  if (!res.ok) throw new Error(`getJornada(${numero}): HTTP ${res.status}`)
  return res.json()
}

export async function getProximaJornada(): Promise<Jornada> {
  const res = await fetch(`${API}/api/jornadas/proxima`, {
    next: { revalidate: 30 },
  })
  if (!res.ok) throw new Error(`getProximaJornada: HTTP ${res.status}`)
  return res.json()
}

export async function getResultadosComunidad(
  jornada: number
): Promise<PronosticoComunidad[]> {
  const res = await fetch(
    `${API}/api/pronosticos/resultados-comunidad/${jornada}`,
    { next: { revalidate: 30 } }
  )
  if (!res.ok)
    throw new Error(`getResultadosComunidad(${jornada}): HTTP ${res.status}`)
  return res.json()
}

export async function postPronostico(data: {
  user: string
  jornada: number
  predictions: {
    matchId: string
    golesLocal: number
    golesVisitante: number
  }[]
}): Promise<void> {
  const res = await fetch(`${API}/api/pronosticos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      (body as { error?: string }).error ?? `postPronostico: HTTP ${res.status}`
    )
  }
}
