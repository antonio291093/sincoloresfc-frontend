'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import TablaResumenComunidad from '@/app/components/ui/TablaResumenComunidad'
import type { FilaTabla } from '@/app/components/ui/TablaResumenComunidad'
import type { PronosticoComunidad, Jornada, PartidoAPI } from '@/app/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

function calcularTablaAgregada(
  resultados: PronosticoComunidad[],
  jornadaData: Jornada | null
): FilaTabla[] {
  if (!resultados.length) return []

  const favoritosPorPartido: Record<string, string | null> = {}
  const escudosPorPartido: Record<
    string,
    { escudoLocal: string; escudoVisitante: string }
  > = {}

  if (jornadaData?.partidos) {
    jornadaData.partidos.forEach((p: PartidoAPI) => {
      const key = `${p.local}-${p.visitante}`
      favoritosPorPartido[key] = p.resultado_sugerido?.favorito ?? null
      escudosPorPartido[key] = {
        escudoLocal: p.escudos?.local ?? '',
        escudoVisitante: p.escudos?.visitante ?? '',
      }
    })
  }

  const pronosticosPorPartido: Record<
    string,
    {
      local: string
      visitante: string
      escudoLocal: string
      escudoVisitante: string
      marcadores: Record<string, number>
      total: number
    }
  > = {}

  resultados.forEach(({ predictions }) => {
    if (!Array.isArray(predictions)) return
    predictions.forEach((pred) => {
      const key = `${pred.local}-${pred.visitante}`
      if (!pronosticosPorPartido[key]) {
        pronosticosPorPartido[key] = {
          local: pred.local,
          visitante: pred.visitante,
          escudoLocal:
            pred.escudoLocal ?? escudosPorPartido[key]?.escudoLocal ?? '',
          escudoVisitante:
            pred.escudoVisitante ?? escudosPorPartido[key]?.escudoVisitante ?? '',
          marcadores: {},
          total: 0,
        }
      }
      const marcadorKey = `${pred.golesLocal}-${pred.golesVisitante}`
      pronosticosPorPartido[key].marcadores[marcadorKey] =
        (pronosticosPorPartido[key].marcadores[marcadorKey] ?? 0) + 1
      pronosticosPorPartido[key].total += 1
    })
  })

  return Object.entries(pronosticosPorPartido).map(([key, datos]) => {
    let masComun: string | null = null
    let maxConteo = 0
    for (const [marcador, conteo] of Object.entries(datos.marcadores)) {
      if (conteo > maxConteo) {
        maxConteo = conteo
        masComun = marcador
      }
    }

    const partes = masComun ? masComun.split('-').map(Number) : [null, null]
    const golesLocal = partes[0]
    const golesVisitante = partes[1]

    const porcentajeCoincidencia = datos.total > 0 ? maxConteo / datos.total : 0

    return {
      local: datos.local,
      visitante: datos.visitante,
      escudoLocal: datos.escudoLocal,
      escudoVisitante: datos.escudoVisitante,
      pronosticoMasComun:
        golesLocal !== null && golesVisitante !== null
          ? { golesLocal, golesVisitante }
          : null,
      porcentajeCoincidencia,
      favoritoModelo: favoritosPorPartido[key] ?? null,
    }
  })
}

function esJornadaFutura(jornadaData: Jornada | null): boolean {
  if (!jornadaData?.partidos?.length) return false
  const ahora = new Date()
  return jornadaData.partidos.every((p) => new Date(p.fecha) > ahora)
}

export default function ComunidadClient() {
  const [jornadas, setJornadas] = useState<number[]>([])
  const [jornadaActiva, setJornadaActiva] = useState<number | null>(null)
  const [jornadaData, setJornadaData] = useState<Jornada | null>(null)
  const [resultados, setResultados] = useState<PronosticoComunidad[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Paso 1: obtener lista de jornadas y detectar la más reciente
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/jornadas`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_URL}/api/jornadas/proxima`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([listaJornadas, proxima]: [unknown, unknown]) => {
        if (Array.isArray(listaJornadas) && listaJornadas.length > 0) {
          const nums = (listaJornadas as { jornada: number }[])
            .map((j) => j.jornada)
            .sort((a, b) => a - b)
          setJornadas(nums)
          // Iniciar en la jornada más reciente disponible
          setJornadaActiva(nums[nums.length - 1])
        } else if (
          proxima &&
          typeof proxima === 'object' &&
          'jornada' in proxima
        ) {
          setJornadaActiva((proxima as { jornada: number }).jornada)
        } else {
          setJornadaActiva(1)
        }
      })
      .catch(() => setJornadaActiva(1))
  }, [])

  // Paso 2: cargar resultados comunidad y datos de jornada cuando cambia jornadaActiva
  useEffect(() => {
    if (jornadaActiva === null) return

    setIsLoading(true)
    setError(null)

    Promise.all([
      fetch(`${API_URL}/api/pronosticos/resultados-comunidad/${jornadaActiva}`)
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`${API_URL}/api/jornadas/${jornadaActiva}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([comunidadData, jornada]: [unknown, unknown]) => {
        setResultados(
          Array.isArray(comunidadData)
            ? (comunidadData as PronosticoComunidad[])
            : []
        )
        setJornadaData(jornada as Jornada | null)
      })
      .catch((err: Error) => setError(err.message || 'Error al cargar los datos'))
      .finally(() => setIsLoading(false))
  }, [jornadaActiva])

  const tablaAgregada =
    resultados.length > 0 ? calcularTablaAgregada(resultados, jornadaData) : []

  const esFutura = esJornadaFutura(jornadaData)

  const textVacio = esFutura
    ? 'Nadie ha registrado sus pronósticos para esta jornada todavía. Sé el primero y después compara cómo le fue a tu quiniela frente a la comunidad.'
    : 'No hubo pronósticos registrados para esta jornada.'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-2">
          Así lo vio la comunidad
        </h1>
        <p className="text-sm font-body text-neutral-500 leading-relaxed">
          Aquí se concentran los marcadores que registraron los participantes
          de esta jornada. No son resultados reales, son predicciones. Puedes
          compararlos con lo que estimó el modelo estadístico.
        </p>
      </div>

      {/* Selector de jornada */}
      <div className="mb-6 flex items-center gap-3">
        <label
          htmlFor="selector-jornada-comunidad"
          className="text-sm font-body font-semibold text-neutral-600 shrink-0"
        >
          Jornada:
        </label>
        {jornadas.length > 0 ? (
          <div className="relative">
            <select
              id="selector-jornada-comunidad"
              value={jornadaActiva ?? ''}
              onChange={(e) => setJornadaActiva(Number(e.target.value))}
              className="appearance-none border border-neutral-200 rounded-[var(--radius-button)] px-3 py-2 pr-8 text-sm font-body text-neutral-700 bg-white hover:border-primary-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {jornadas.map((num) => (
                <option key={num} value={num}>
                  Jornada {num}
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
        ) : (
          <span className="text-sm text-neutral-400">Cargando jornadas...</span>
        )}
      </div>

      {/* Contenido */}
      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          aria-label="Cargando resultados"
          role="status"
        >
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-error-50 border border-error-500 rounded-[var(--radius-card)] p-4 text-sm text-error-700">
          {error}
        </div>
      ) : resultados.length === 0 ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-[var(--radius-card)] p-6 text-center">
          <p className="font-body text-sm text-neutral-500 leading-relaxed max-w-md mx-auto">
            {textVacio}
          </p>
          {esFutura && (
            <Link
              href="/quiniela"
              className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-button)] bg-primary-600 text-white text-sm font-body font-semibold hover:bg-primary-700 transition-colors"
            >
              Registra tu quiniela
            </Link>
          )}
          {!esFutura && (
            <Link
              href={`/pronosticos?jornada=${jornadaActiva}`}
              className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-button)] border border-neutral-300 bg-white text-neutral-700 text-sm font-body font-semibold hover:border-primary-500 hover:text-primary-700 transition-colors"
            >
              Ver análisis del modelo
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-xs font-body text-neutral-400">
            {resultados.length} participante{resultados.length !== 1 ? 's' : ''}{' '}
            registraron sus pronósticos para esta jornada.
          </p>
          <TablaResumenComunidad filas={tablaAgregada} />
        </div>
      )}
    </div>
  )
}
