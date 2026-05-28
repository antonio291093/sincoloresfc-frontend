import Image from 'next/image'
import { PartidoComparacion } from '@/app/types'

const ESCUDOS: Record<string, string> = {
  'Club America':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734702/america_bm8czi.png',
  'Mazatlan FC':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734702/mazatlan_ysrahl.png',
  'Tigres UANL':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734701/tigres_usxmjx.png',
  'Club Tijuana':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734702/tijuana_i4ypbn.png',
  Toluca:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734701/toluca_pivmbb.png',
  Pachuca:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734701/pachuca_rnwxpi.png',
  Queretaro:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734701/queretaro_avsnyi.png',
  'Santos Laguna':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734701/santos_zhqjto.png',
  'UNAM Pumas':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734701/pumas_lqmocy.png',
  Puebla:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734700/puebla_tueusm.png',
  Necaxa:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734700/necaxa_hph9w9.png',
  Monterrey:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734700/monterrey_mhqjq7.png',
  'Atl. San Luis':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734699/atleticosl_ldbjtw.png',
  Atlas:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734699/atlas_zgl1nk.png',
  'Guadalajara Chivas':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734699/guadalajara_vzgwrp.png',
  'Club Leon':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734699/leon_e3xrsx.png',
  Juarez:
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734699/juarez_sbtv5l.png',
  'Cruz Azul':
    'https://res.cloudinary.com/dfpubv5hp/image/upload/v1750734699/cruzazul_zt603l.png',
}

function EscudoImg({ equipo, size = 36 }: { equipo: string; size?: number }) {
  const src = ESCUDOS[equipo]
  if (!src) return null
  return (
    <Image
      src={src}
      alt={`Escudo de ${equipo}`}
      width={size}
      height={size}
      className="object-contain shrink-0"
      unoptimized
    />
  )
}

export default function PartidoComparacionCard({ partido }: { partido: PartidoComparacion }) {
  const {
    local,
    visitante,
    goles_real_local,
    goles_real_visitante,
    ganador_real,
    favorito_modelo,
    prob_local,
    prob_empate,
    prob_visitante,
    goles_esperados_local,
    goles_esperados_visitante,
    acierto,
  } = partido

  let borderClass = 'border-l-4 border-neutral-300'
  if (acierto === true) {
    borderClass = 'border-l-4 border-success-500'
  } else if (acierto === false && ganador_real !== 'empate') {
    borderClass = 'border-l-4 border-error-500'
  } else if (ganador_real === 'empate') {
    borderClass = 'border-l-4 border-warning-500'
  }

  let badgeClass = 'bg-neutral-100 text-neutral-500'
  let badgeText = 'Pendiente'
  if (acierto === true) {
    badgeClass = 'bg-success-100 text-success-700'
    badgeText = 'Acertó'
  } else if (acierto === false) {
    badgeClass = 'bg-error-100 text-error-700'
    badgeText = 'Falló'
  }

  const favoritoNombre =
    favorito_modelo === 'local'
      ? local
      : favorito_modelo === 'visitante'
      ? visitante
      : null

  const probFavorito =
    favorito_modelo === 'local'
      ? prob_local
      : favorito_modelo === 'visitante'
      ? prob_visitante
      : prob_empate

  const nombreMostrado =
    favorito_modelo === 'local'
      ? local
      : favorito_modelo === 'visitante'
      ? visitante
      : 'Empate'

  return (
    <article
      className={`bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 shadow-sm overflow-hidden ${borderClass}`}
    >
      <div className="p-4">
        {/* Cabecera: escudos + nombres + badge */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <EscudoImg equipo={local} size={36} />
            <span className="font-display font-bold text-lg truncate">{local}</span>
          </div>

          <span className="text-neutral-400 text-sm shrink-0">vs</span>

          <div className="flex items-center gap-2 min-w-0 flex-row-reverse">
            <EscudoImg equipo={visitante} size={36} />
            <span className="font-display font-bold text-lg truncate text-right">
              {visitante}
            </span>
          </div>

          <span
            className={`shrink-0 px-2 py-0.5 rounded-[var(--radius-badge)] text-xs font-data font-semibold ${badgeClass}`}
          >
            {badgeText}
          </span>
        </div>

        {/* Resultado real */}
        {ganador_real !== null ? (
          <div className="mb-3">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">
              Resultado final
            </p>
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-4xl font-data font-bold ${
                  ganador_real === 'local' ? 'text-primary-700' : 'text-neutral-400'
                }`}
              >
                {goles_real_local}
              </span>
              <span className="text-neutral-300 text-xl">—</span>
              <span
                className={`text-4xl font-data font-bold ${
                  ganador_real === 'visitante' ? 'text-accent-600' : 'text-neutral-400'
                }`}
              >
                {goles_real_visitante}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-400 italic mb-3">Partido pendiente</p>
        )}

        {/* Predicción del modelo */}
        <div className="border-t border-neutral-100 pt-3">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
            Modelo predijo
          </p>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              {favoritoNombre && <EscudoImg equipo={favoritoNombre} size={20} />}
              <span className="text-sm font-body font-semibold text-neutral-700">
                {nombreMostrado}
              </span>
              {typeof probFavorito === 'number' && (
                <span className="text-xs font-data text-neutral-500">
                  ({Math.round(probFavorito * 100)}%)
                </span>
              )}
            </div>
            <div className="text-xs font-data text-neutral-400">
              Goles esp:{' '}
              {typeof goles_esperados_local === 'number'
                ? goles_esperados_local.toFixed(1)
                : '—'}{' '}
              —{' '}
              {typeof goles_esperados_visitante === 'number'
                ? goles_esperados_visitante.toFixed(1)
                : '—'}
              {ganador_real !== null && (
                <span className="ml-2 text-neutral-300">
                  | Real: {goles_real_local} — {goles_real_visitante}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
