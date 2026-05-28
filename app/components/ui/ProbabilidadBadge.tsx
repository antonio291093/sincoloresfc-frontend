interface ProbabilidadBadgeProps {
  valor: number
}

export default function ProbabilidadBadge({ valor }: ProbabilidadBadgeProps) {
  const base =
    'inline-flex items-center px-2 py-0.5 rounded-[var(--radius-badge)] text-xs font-data font-semibold leading-none'

  if (valor >= 0.6) {
    return (
      <span className={`${base} bg-gold-200 text-gold-900`} title="Pronóstico sólido">
        Pronóstico sólido {Math.round(valor * 100)}%
      </span>
    )
  }

  if (valor >= 0.45) {
    return (
      <span className={`${base} bg-neutral-200 text-neutral-700`} title="Partido parejo">
        Partido parejo {Math.round(valor * 100)}%
      </span>
    )
  }

  return (
    <span className={`${base} bg-surface-200 text-neutral-500`} title="Resultado abierto">
      Resultado abierto {Math.round(valor * 100)}%
    </span>
  )
}
