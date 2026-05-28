'use client'
import { useEffect, useState } from 'react'
import PartidoCard from '@/app/components/ui/PartidoCard'
import type { Partido, PartidoAPI } from '@/app/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

interface PronosticosClientProps {
  jornadaParam?: string
}

function adaptarPartido(p: PartidoAPI): Partido {
  return {
    _id: p._id,
    local: p.local,
    visitante: p.visitante,
    fecha: p.fecha,
    hora: p.hora,
    escudos: p.escudos,
    probabilidades: p.probabilidades,
    golesEsperados: p.goles_esperados,
    resultadoSugerido: p.resultado_sugerido,
    analisis: {
      formaReciente: p.analisis?.forma_reciente,
      enfrentamientosDirectos: p.analisis?.enfrentamientos_directos,
    },
  }
}

function SkeletonCard() {
  return (
    <div className="bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 p-4 animate-pulse">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-neutral-200 rounded-full shrink-0" />
          <div className="h-4 w-28 bg-neutral-200 rounded" />
        </div>
        <div className="h-4 w-6 bg-neutral-200 rounded" />
        <div className="flex items-center gap-2 flex-row-reverse">
          <div className="w-9 h-9 bg-neutral-200 rounded-full shrink-0" />
          <div className="h-4 w-28 bg-neutral-200 rounded" />
        </div>
      </div>
      <div className="h-2 bg-neutral-200 rounded-full mb-3" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 bg-neutral-200 rounded" />
        <div className="h-4 w-4 bg-neutral-200 rounded" />
      </div>
    </div>
  )
}

export default function PronosticosClient({ jornadaParam }: PronosticosClientProps) {
  const [jornadaActiva, setJornadaActiva] = useState<number | null>(
    jornadaParam ? Number(jornadaParam) : null
  )
  const [jornadaProxima, setJornadaProxima] = useState<number | null>(null)
  const [jornadas, setJornadas] = useState<number[]>([])
  const [data, setData] = useState<{ partidos: PartidoAPI[] } | null>(null)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isLoadingPartidos, setIsLoadingPartidos] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Paso 1: obtener lista de jornadas y jornada próxima (solo si no hay jornadaParam)
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/jornadas`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_URL}/api/jornadas/proxima`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([listaJornadas, proxima]: [unknown, unknown]) => {
        if (Array.isArray(listaJornadas)) {
          const nums = (listaJornadas as { jornada: number }[])
            .map((j) => j.jornada)
            .sort((a, b) => a - b)
          setJornadas(nums)
        }
        const numProxima =
          proxima && typeof proxima === 'object' && 'jornada' in proxima
            ? (proxima as { jornada: number }).jornada
            : null
        setJornadaProxima(numProxima)

        // Si no viene jornadaParam, usamos la jornada proxima
        if (!jornadaParam) {
          setJornadaActiva(numProxima ?? 1)
        }
      })
      .catch(() => {
        if (!jornadaParam) setJornadaActiva(1)
      })
      .finally(() => setIsLoadingInitial(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sincroniza jornadaActiva si el prop cambia por navegación externa (back/forward)
  useEffect(() => {
    if (jornadaParam) {
      setJornadaActiva(Number(jornadaParam))
    }
  }, [jornadaParam])

  // Paso 2: cargar la jornada activa
  useEffect(() => {
    if (jornadaActiva === null) return

    setIsLoadingPartidos(true)
    setError(null)

    fetch(`${API_URL}/api/jornadas/${jornadaActiva}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((result: { partidos: PartidoAPI[] }) => {
        setData(result)
      })
      .catch((err: Error) => {
        setError(err.message || 'Error al cargar los datos')
      })
      .finally(() => setIsLoadingPartidos(false))
  }, [jornadaActiva])

  const handleJornadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = Number(e.target.value)
    setJornadaActiva(num)
    // Actualiza la URL sin disparar navegación del App Router (evita interferencia con el fetch)
    window.history.pushState(null, '', `/pronosticos?jornada=${num}`)
  }

  const handleReintentar = () => {
    if (jornadaActiva === null) return
    setError(null)
    setIsLoadingPartidos(true)
    fetch(`${API_URL}/api/jornadas/${jornadaActiva}`)
      .then((r) => r.json())
      .then((result: { partidos: PartidoAPI[] }) => setData(result))
      .catch((e: Error) => setError(e.message))
      .finally(() => setIsLoadingPartidos(false))
  }

  // Loading inicial (esperando saber qué jornada cargar)
  if (isLoadingInitial || (jornadaActiva === null && !error)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-error-50 border border-error-500 rounded-[var(--radius-card)] p-6 max-w-md mx-auto">
          <p className="font-body font-semibold text-error-700 mb-2">
            No se pudieron cargar los pronósticos
          </p>
          <p className="text-sm text-neutral-500 mb-4">
            Verifica tu conexión e intenta de nuevo.
          </p>
          <button
            onClick={handleReintentar}
            className="px-4 py-2 rounded-[var(--radius-button)] bg-primary-600 text-white text-sm font-body font-semibold hover:bg-primary-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // Sin datos
  if (!isLoadingPartidos && (!data || !data.partidos || data.partidos.length === 0)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-warning-50 border border-warning-500 rounded-[var(--radius-card)] p-6 max-w-md mx-auto">
          <p className="font-body text-warning-700">
            <strong>La jornada {jornadaActiva} aún no ha sido analizada.</strong>
            <br />
            Selecciona otra jornada en el menú superior.
          </p>
        </div>
      </div>
    )
  }

  const partidos = (data?.partidos ?? []).map(adaptarPartido)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Cabecera con selector de jornadas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display font-bold text-3xl text-neutral-900">
          Jornada {jornadaActiva}
        </h1>

        {jornadas.length > 0 && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="selector-jornada"
              className="text-sm font-body text-neutral-500 shrink-0"
            >
              Cambiar jornada:
            </label>
            <div className="relative">
              <select
                id="selector-jornada"
                value={jornadaActiva ?? ''}
                onChange={handleJornadaChange}
                className="appearance-none border border-neutral-200 rounded-[var(--radius-button)] px-3 py-2 pr-8 text-sm font-body text-neutral-700 bg-white hover:border-primary-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {jornadas.map((num) => (
                  <option key={num} value={num}>
                    Jornada {num}
                    {jornadaProxima === num ? ' (actual)' : ''}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Lista de partidos */}
      {isLoadingPartidos ? (
        <div className="space-y-4" aria-label="Cargando partidos" role="status">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {partidos.map((partido) => (
            <PartidoCard key={partido._id} partido={partido} />
          ))}
        </div>
      )}

      {/* Nota legal */}
      <p className="mt-8 text-xs text-neutral-400 text-center leading-relaxed max-w-2xl mx-auto">
        Los pronósticos son orientativos y no garantizan resultados reales.
        SinColoresFC.mx es un proyecto independiente y no tiene afiliación con
        la Liga MX ni con ninguna de sus instituciones.
      </p>
    </div>
  )
}
