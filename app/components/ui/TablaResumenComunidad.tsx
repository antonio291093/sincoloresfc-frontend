export interface FilaTabla {
  local: string
  visitante: string
  escudoLocal: string
  escudoVisitante: string
  pronosticoMasComun: { golesLocal: number; golesVisitante: number } | null
  porcentajeCoincidencia: number
  favoritoModelo: string | null
}

interface TablaResumenComunidadProps {
  filas: FilaTabla[]
}

export default function TablaResumenComunidad({ filas }: TablaResumenComunidadProps) {
  if (!filas || filas.length === 0) {
    return (
      <p className="text-center py-8 text-neutral-500 text-sm">
        No hay datos de comunidad para esta jornada.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-neutral-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-100 border-b border-neutral-200">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide"
            >
              Partido
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wide"
            >
              Pronóstico más común
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wide"
            >
              Coincidencia
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden sm:table-cell"
            >
              Favorito modelo
            </th>
          </tr>
        </thead>
        <tbody className="bg-surface-card divide-y divide-neutral-100">
          {filas.map((fila, idx) => {
            const pct = Math.round((fila.porcentajeCoincidencia ?? 0) * 100)
            const esAltaCoincidencia = pct >= 50

            return (
              <tr key={idx} className="hover:bg-surface-100 transition-colors">
                {/* Equipos */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {fila.escudoLocal && (
                      <img
                        src={fila.escudoLocal}
                        alt={fila.local}
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                    )}
                    <span className="font-display font-semibold text-neutral-800">
                      {fila.local}
                    </span>
                    <span className="text-neutral-400 text-xs">vs</span>
                    <span className="font-display font-semibold text-neutral-800">
                      {fila.visitante}
                    </span>
                    {fila.escudoVisitante && (
                      <img
                        src={fila.escudoVisitante}
                        alt={fila.visitante}
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                </td>

                {/* Pronóstico más común */}
                <td className="px-4 py-3 text-center">
                  {fila.pronosticoMasComun ? (
                    <span className="inline-flex items-center justify-center gap-1 font-data font-bold text-base text-neutral-900">
                      <span className="text-primary-700">
                        {fila.pronosticoMasComun.golesLocal}
                      </span>
                      <span className="text-neutral-400">–</span>
                      <span className="text-accent-600">
                        {fila.pronosticoMasComun.golesVisitante}
                      </span>
                    </span>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>

                {/* Porcentaje de coincidencia */}
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[var(--radius-badge)] font-data font-semibold text-xs ${
                      esAltaCoincidencia
                        ? 'bg-gold-200 text-gold-900'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {pct}%
                  </span>
                </td>

                {/* Favorito del modelo */}
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {fila.favoritoModelo ? (
                    <span className="font-display font-semibold text-primary-700 text-sm">
                      {fila.favoritoModelo}
                    </span>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
