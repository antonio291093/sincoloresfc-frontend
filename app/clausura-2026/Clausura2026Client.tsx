'use client'
import React, { useEffect, useState, useCallback } from 'react'
import PanelResumenModelo from '@/app/components/ui/PanelResumenModelo'
import PartidoComparacionCard from '@/app/components/ui/PartidoComparacionCard'
import { PartidoComparacion, ResumenModelo } from '@/app/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
const TOTAL_JORNADAS = 17

function SkeletonCard() {
  return (
    <div className="bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 shadow-sm p-4 animate-pulse">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
          <div className="h-5 w-28 bg-neutral-200 rounded" />
        </div>
        <div className="h-4 w-5 bg-neutral-100 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-28 bg-neutral-200 rounded" />
          <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
        </div>
        <div className="h-5 w-16 bg-neutral-100 rounded" />
      </div>
      <div className="h-12 bg-neutral-100 rounded mb-3" />
      <div className="border-t border-neutral-100 pt-3">
        <div className="h-4 w-24 bg-neutral-100 rounded mb-2" />
        <div className="h-4 w-full bg-neutral-100 rounded" />
      </div>
    </div>
  )
}

function SkeletonCards() {
  return (
    <div className="space-y-4" role="status" aria-label="Cargando partidos">
      {Array.from({ length: 9 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default function Clausura2026Client() {
  const [jornadaActiva, setJornadaActiva] = useState(1)
  const [partidos, setPartidos] = useState<PartidoComparacion[]>([])
  const [resumen, setResumen] = useState<ResumenModelo | null>(null)
  const [loadingPartidos, setLoadingPartidos] = useState(true)
  const [loadingResumen, setLoadingResumen] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoadingResumen(true)
    fetch(`${API_URL}/api/comparacion/resumen`)
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status}`)
        return r.json()
      })
      .then((json: { success: boolean; data: ResumenModelo }) => {
        if (json?.success && json?.data) {
          setResumen(json.data)
        }
      })
      .catch(() => {
        setResumen(null)
      })
      .finally(() => setLoadingResumen(false))
  }, [])

  const fetchPartidos = useCallback((jornada: number) => {
    setLoadingPartidos(true)
    setError(null)
    fetch(`${API_URL}/api/comparacion/${jornada}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status} al obtener la jornada ${jornada}`)
        return r.json()
      })
      .then((json: { success: boolean; data: PartidoComparacion[] }) => {
        if (json?.success && Array.isArray(json?.data)) {
          setPartidos(json.data)
        } else {
          setPartidos([])
        }
      })
      .catch((err: Error) => {
        setError(err.message || 'No se pudieron cargar los partidos.')
        setPartidos([])
      })
      .finally(() => setLoadingPartidos(false))
  }, [])

  useEffect(() => {
    fetchPartidos(jornadaActiva)
  }, [jornadaActiva, fetchPartidos])

  const handleJornadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJornadaActiva(Number(e.target.value))
  }

  const jornadaOptions = Array.from({ length: TOTAL_JORNADAS }, (_, i) => i + 1)

  return (
    <div>
      <h1 className="font-display font-bold text-3xl text-neutral-900">
        Clausura 2026 — Pronóstico vs Realidad
      </h1>
      <p className="font-body text-neutral-500 mt-1 mb-6">
        17 jornadas. ¿Cuántos ganadores acertó el modelo?
      </p>

      <PanelResumenModelo resumen={loadingResumen ? null : resumen} />

      {/* Selector de jornada */}
      <div className="mb-6 flex items-center gap-3">
        <label
          htmlFor="selector-jornada-clausura"
          className="text-sm font-body font-semibold text-neutral-600 shrink-0"
        >
          Jornada:
        </label>
        <div className="relative">
          <select
            id="selector-jornada-clausura"
            value={jornadaActiva}
            onChange={handleJornadaChange}
            className="appearance-none border border-neutral-200 rounded-[var(--radius-button)] px-3 py-2 pr-8 text-sm font-body text-neutral-700 bg-white hover:border-primary-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {jornadaOptions.map((num) => (
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
      </div>

      {/* Lista de partidos */}
      {loadingPartidos ? (
        <SkeletonCards />
      ) : error ? (
        <div className="bg-error-50 border border-error-500 rounded-[var(--radius-card)] p-4">
          <p className="text-sm font-body text-error-700 mb-3">{error}</p>
          <button
            onClick={() => fetchPartidos(jornadaActiva)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-[var(--radius-button)] bg-error-600 text-white text-sm font-body font-semibold hover:bg-error-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : partidos.length === 0 ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-[var(--radius-card)] p-6 text-center">
          <p className="font-body text-sm text-neutral-500 leading-relaxed max-w-md mx-auto">
            No hay datos disponibles para esta jornada todavía. El modelo actualiza los resultados
            conforme se disputan los partidos.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {partidos.map((partido) => (
            <PartidoComparacionCard key={partido.match_id ?? `${partido.local}-${partido.visitante}`} partido={partido} />
          ))}
        </div>
      )}

      <p className="mt-8 text-xs font-body text-neutral-400 text-center leading-relaxed">
        Las predicciones son generadas por un modelo estadístico con base en datos históricos de la
        Liga MX. No constituyen asesoramiento deportivo ni de apuestas.
      </p>
    </div>
  )
}
