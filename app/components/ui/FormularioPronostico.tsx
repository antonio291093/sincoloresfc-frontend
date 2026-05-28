import Image from 'next/image'
import type { PartidoAPI } from '@/app/types'

export interface PronosticoModelo {
  favorito: string | null
  probabilidadFavorito: number | undefined
  golesEsperados: Record<string, number>
}

export interface FormularioPronosticoProps {
  partido: PartidoAPI
  pronosticoModelo: PronosticoModelo
  value: { golesLocal: string; golesVisitante: string } | undefined
  onChange: (id: string, field: 'golesLocal' | 'golesVisitante', value: string) => void
  disabled: boolean
}

export default function FormularioPronostico({
  partido,
  pronosticoModelo,
  value,
  onChange,
  disabled = false,
}: FormularioPronosticoProps) {
  const { _id, local, visitante, escudos, fecha } = partido
  const { favorito, probabilidadFavorito, golesEsperados } = pronosticoModelo ?? {}

  const fechaFormateada = fecha
    ? new Date(fecha).toLocaleDateString('es-MX', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <div
      className={`bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 p-4 transition-opacity ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      {/* Fila principal: equipos + inputs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Equipo local */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src={escudos.local}
              alt={local}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span className="font-display font-semibold text-base text-neutral-800 truncate">
            {local}
          </span>
        </div>

        {/* Inputs de goles */}
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={15}
            placeholder="0"
            value={value?.golesLocal ?? ''}
            onChange={(e) => onChange(_id, 'golesLocal', e.target.value)}
            disabled={disabled}
            aria-label={`Goles ${local}`}
            className="w-12 h-10 rounded-[var(--radius-input)] border border-neutral-300 bg-neutral-50 text-center text-base font-data font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed transition"
          />
          <span className="text-neutral-400 font-bold text-lg select-none">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={15}
            placeholder="0"
            value={value?.golesVisitante ?? ''}
            onChange={(e) => onChange(_id, 'golesVisitante', e.target.value)}
            disabled={disabled}
            aria-label={`Goles ${visitante}`}
            className="w-12 h-10 rounded-[var(--radius-input)] border border-neutral-300 bg-neutral-50 text-center text-base font-data font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed transition"
          />
        </div>

        {/* Equipo visitante */}
        <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-row-reverse">
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src={escudos.visitante}
              alt={visitante}
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span className="font-display font-semibold text-base text-neutral-800 truncate sm:text-right">
            {visitante}
          </span>
        </div>
      </div>

      {/* Fila secundaria: sugerencia del modelo + fecha */}
      <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="text-xs text-neutral-500">
          {favorito && (
            <>
              Modelo sugiere:{' '}
              <span className="font-semibold text-primary-700">{favorito}</span>
              {golesEsperados && (
                <span className="font-data ml-1 text-neutral-400">
                  ({Number(golesEsperados[local] ?? 0).toFixed(1)}–
                  {Number(golesEsperados[visitante] ?? 0).toFixed(1)})
                </span>
              )}
              {probabilidadFavorito !== undefined && (
                <span className="font-data ml-1 text-neutral-400">
                  · {Math.round(probabilidadFavorito * 100)}%
                </span>
              )}
            </>
          )}
        </div>
        {fechaFormateada && (
          <span className="text-xs font-data text-neutral-400">{fechaFormateada}</span>
        )}
      </div>
    </div>
  )
}
