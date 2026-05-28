import { ResumenModelo, JornadaResumen } from '@/app/types'

function barColor(pct: number): string {
  if (pct >= 55) return 'bg-success-500'
  if (pct >= 40) return 'bg-warning-500'
  return 'bg-error-500'
}

export default function PanelResumenModelo({ resumen }: { resumen: ResumenModelo | null }) {
  if (!resumen) {
    return (
      <div
        className="bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 shadow-sm p-4 mb-6 animate-pulse"
        role="status"
        aria-label="Cargando resumen del modelo"
      >
        <div className="grid grid-cols-3 divide-x divide-neutral-100">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-2 flex flex-col items-center gap-2">
              <div className="h-3 w-24 bg-neutral-200 rounded" />
              <div className="h-9 w-16 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
        <div className="hidden sm:block mt-4 h-16 bg-neutral-100 rounded" />
      </div>
    )
  }

  const { porcentaje_aciertos, por_jornada = [] } = resumen

  const jornadasConResultado = por_jornada.filter((j) => j.con_resultado > 0)

  const mejorJornada = jornadasConResultado.reduce<JornadaResumen | null>(
    (best, j) => (j.porcentaje !== null && (best === null || (best.porcentaje !== null && j.porcentaje > best.porcentaje)) ? j : best),
    null
  )

  const peorJornada = jornadasConResultado.reduce<JornadaResumen | null>(
    (worst, j) => (j.porcentaje !== null && (worst === null || (worst.porcentaje !== null && j.porcentaje < worst.porcentaje)) ? j : worst),
    null
  )

  const globalPct =
    typeof porcentaje_aciertos === 'number' ? Math.round(porcentaje_aciertos) : null

  return (
    <div className="bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 shadow-sm p-4 mb-6">
      {/* Fila de 3 stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
        <div className="py-3 sm:py-2 sm:px-4 flex flex-col items-center text-center">
          <p className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide mb-1">
            Aciertos globales
          </p>
          <span className="font-data font-bold text-4xl text-primary-700 leading-none">
            {globalPct !== null ? `${globalPct}%` : '—'}
          </span>
        </div>

        <div className="py-3 sm:py-2 sm:px-4 flex flex-col items-center text-center">
          <p className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide mb-1">
            Mejor jornada
          </p>
          {mejorJornada ? (
            <div className="flex items-baseline gap-1.5">
              <span className="font-data font-bold text-xl text-success-700 leading-none">
                J{mejorJornada.jornada}
              </span>
              <span className="font-data text-sm text-success-600">
                {mejorJornada.porcentaje !== null ? Math.round(mejorJornada.porcentaje) : '—'}%
              </span>
            </div>
          ) : (
            <span className="font-data font-bold text-xl text-neutral-300">—</span>
          )}
        </div>

        <div className="py-3 sm:py-2 sm:px-4 flex flex-col items-center text-center">
          <p className="text-xs font-body font-semibold text-neutral-400 uppercase tracking-wide mb-1">
            Peor jornada
          </p>
          {peorJornada ? (
            <div className="flex items-baseline gap-1.5">
              <span className="font-data font-bold text-xl text-error-700 leading-none">
                J{peorJornada.jornada}
              </span>
              <span className="font-data text-sm text-error-600">
                {peorJornada.porcentaje !== null ? Math.round(peorJornada.porcentaje) : '—'}%
              </span>
            </div>
          ) : (
            <span className="font-data font-bold text-xl text-neutral-300">—</span>
          )}
        </div>
      </div>

      {/* Mini gráfica de barras — solo desktop */}
      {por_jornada.length > 0 && (
        <div
          className="hidden sm:flex items-end gap-1 h-16 mt-4"
          role="img"
          aria-label="Gráfica de porcentaje de aciertos por jornada"
        >
          {por_jornada.map((j) => {
            const pct = j.con_resultado > 0 && j.porcentaje !== null ? Math.round(j.porcentaje) : 0
            const isPending = j.con_resultado === 0
            return (
              <div
                key={j.jornada}
                className="flex flex-col items-center gap-0.5 flex-1"
                title={isPending ? `J${j.jornada}: pendiente` : `J${j.jornada}: ${pct}%`}
              >
                <div
                  className={`w-full rounded-t-sm transition-all ${
                    isPending ? 'bg-neutral-200' : barColor(pct)
                  }`}
                  style={{ height: isPending ? '4px' : `${Math.max(pct, 4)}%` }}
                />
                <span className="text-[10px] font-data text-neutral-400 leading-none">
                  J{j.jornada}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
