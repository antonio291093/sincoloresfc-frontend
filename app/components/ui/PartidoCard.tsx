'use client'
import { useState } from 'react'
import Image from 'next/image'
import ProbabilidadBadge from './ProbabilidadBadge'
import type { Partido } from '@/app/types'

interface PartidoCardProps {
  partido: Partido
}

function FormaTag({ valor }: { valor: number }) {
  const base =
    'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-data font-medium'
  if (valor >= 2.5)
    return <span className={`${base} bg-success-100 text-success-700`}>F. Alta</span>
  if (valor >= 1.5)
    return <span className={`${base} bg-warning-100 text-warning-700`}>F. Media</span>
  return <span className={`${base} bg-neutral-100 text-neutral-600`}>F. Baja</span>
}

function SeccionExpandida({ partido }: { partido: Partido }) {
  const { local, visitante, golesEsperados, analisis } = partido
  const formaLocal = analisis?.formaReciente?.[local]
  const formaVisitante = analisis?.formaReciente?.[visitante]
  const h2h = analisis?.enfrentamientosDirectos

  return (
    <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {golesEsperados && (
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            Goles esperados
          </p>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="block text-2xl font-data font-bold text-primary-700">
                {Number(golesEsperados[local]).toFixed(1)}
              </span>
              <span className="text-xs text-neutral-500">{local}</span>
            </div>
            <span className="text-neutral-300 text-lg font-light">vs</span>
            <div className="text-center">
              <span className="block text-2xl font-data font-bold text-accent-600">
                {Number(golesEsperados[visitante]).toFixed(1)}
              </span>
              <span className="text-xs text-neutral-500">{visitante}</span>
            </div>
          </div>
        </div>
      )}

      {formaLocal && formaVisitante && (
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            Forma reciente
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-700 truncate">{local}</span>
              <div className="flex items-center gap-2 shrink-0">
                <FormaTag valor={formaLocal.puntos_por_partido} />
                <span className="text-xs font-data text-neutral-500">
                  {formaLocal.goles_anotados}G / {formaLocal.goles_concedidos}C
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-700 truncate">{visitante}</span>
              <div className="flex items-center gap-2 shrink-0">
                <FormaTag valor={formaVisitante.puntos_por_partido} />
                <span className="text-xs font-data text-neutral-500">
                  {formaVisitante.goles_anotados}G / {formaVisitante.goles_concedidos}C
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {h2h?.promedios_goles && (
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            Últimos enfrentamientos (prom. goles)
          </p>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="block text-xl font-data font-semibold text-neutral-800">
                {Number(h2h.promedios_goles[local]).toFixed(1)}
              </span>
              <span className="text-xs text-neutral-500">{local}</span>
            </div>
            <span className="text-neutral-300">—</span>
            <div className="text-center">
              <span className="block text-xl font-data font-semibold text-neutral-800">
                {Number(h2h.promedios_goles[visitante]).toFixed(1)}
              </span>
              <span className="text-xs text-neutral-500">{visitante}</span>
            </div>
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
          Fecha y hora
        </p>
        <p className="text-sm font-data text-neutral-700">
          {partido.fecha
            ? new Date(partido.fecha).toLocaleDateString('es-MX', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : '—'}
          {partido.hora ? ` · ${partido.hora}` : ''}
        </p>
      </div>
    </div>
  )
}

function BarraProbabilidades({
  probabilidades,
  local,
  visitante,
}: {
  probabilidades: Record<string, number>
  local: string
  visitante: string
}) {
  const pLocal = probabilidades[local] ?? 0
  const pEmpate = probabilidades['empate'] ?? 0
  const pctLocal = Math.round(pLocal * 100)
  const pctEmpate = Math.round(pEmpate * 100)
  const pctVisitante = 100 - pctLocal - pctEmpate

  return (
    <div className="w-full">
      <div
        className="flex rounded-full overflow-hidden h-2"
        role="img"
        aria-label="Barra de probabilidades"
      >
        <div
          className="bg-primary-500 transition-all duration-500"
          style={{ width: `${pctLocal}%` }}
        />
        <div
          className="bg-neutral-300 transition-all duration-500"
          style={{ width: `${pctEmpate}%` }}
        />
        <div
          className="bg-accent-500 transition-all duration-500"
          style={{ width: `${pctVisitante}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs font-data text-primary-700">{pctLocal}%</span>
        <span className="text-xs font-data text-neutral-500">{pctEmpate}%</span>
        <span className="text-xs font-data text-accent-600">{pctVisitante}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-neutral-400 truncate max-w-[35%]">{local}</span>
        <span className="text-xs text-neutral-400">Empate</span>
        <span className="text-xs text-neutral-400 truncate max-w-[35%] text-right">
          {visitante}
        </span>
      </div>
    </div>
  )
}

export default function PartidoCard({ partido }: PartidoCardProps) {
  const [expandido, setExpandido] = useState(false)

  const { local, visitante, escudos, probabilidades, resultadoSugerido } = partido

  const probFavorito =
    resultadoSugerido?.favorito && resultadoSugerido.favorito !== 'empate'
      ? probabilidades?.[resultadoSugerido.favorito]
      : probabilidades?.['empate']

  return (
    <article className="bg-surface-card rounded-[var(--radius-card)] shadow-sm border border-neutral-200 overflow-hidden transition-shadow hover:shadow-md">
      <button
        className="w-full text-left p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
        onClick={() => setExpandido((v) => !v)}
        aria-expanded={expandido}
      >
        {/* Cabecera: equipos */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src={escudos.local}
                alt={local}
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="font-display font-bold text-lg leading-tight text-neutral-800 truncate">
              {local}
            </span>
          </div>

          <span className="text-neutral-400 text-sm font-light shrink-0">vs</span>

          <div className="flex items-center gap-2 min-w-0 flex-row-reverse">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src={escudos.visitante}
                alt={visitante}
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="font-display font-bold text-lg leading-tight text-neutral-800 truncate text-right">
              {visitante}
            </span>
          </div>
        </div>

        {/* Barra de probabilidades */}
        {probabilidades && (
          <div className="mb-3">
            <BarraProbabilidades
              probabilidades={probabilidades}
              local={local}
              visitante={visitante}
            />
          </div>
        )}

        {/* Footer del card: favorito + badge + chevron */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Favorito:</span>
            {resultadoSugerido?.escudo && (
              <div className="relative w-5 h-5">
                <Image
                  src={resultadoSugerido.escudo}
                  alt={resultadoSugerido.favorito}
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-sm font-semibold text-neutral-800">
              {resultadoSugerido?.favorito}
            </span>
            {probFavorito !== undefined && (
              <ProbabilidadBadge valor={probFavorito} />
            )}
          </div>

          <svg
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
              expandido ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expandido && (
        <div className="px-4 pb-4">
          <SeccionExpandida partido={partido} />
        </div>
      )}
    </article>
  )
}
