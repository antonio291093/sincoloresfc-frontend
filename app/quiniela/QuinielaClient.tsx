'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FormularioPronostico from '@/app/components/ui/FormularioPronostico'
import type { PartidoAPI } from '@/app/types'
import type { PronosticoModelo } from '@/app/components/ui/FormularioPronostico'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
const LIMITE_PRONOSTICOS = 30
const UMBRAL_CASI_LLENO = 25

function parseFechaPartido(fecha: string, hora: string): Date {
  const esISOConHora = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(fecha)
  if (esISOConHora) return new Date(fecha)
  return new Date(`${fecha}T${hora || '00:00'}`)
}

function getFechaHoraPrimerPartido(partidos: PartidoAPI[]): Date | null {
  if (!partidos.length) return null
  const ordenados = [...partidos].sort(
    (a, b) =>
      parseFechaPartido(a.fecha, a.hora).getTime() -
      parseFechaPartido(b.fecha, b.hora).getTime()
  )
  const fecha = parseFechaPartido(ordenados[0].fecha, ordenados[0].hora)
  return isNaN(fecha.getTime()) ? null : fecha
}

function buildPronosticoModelo(partido: PartidoAPI): PronosticoModelo {
  return {
    favorito: partido.resultado_sugerido?.favorito ?? null,
    probabilidadFavorito:
      partido.resultado_sugerido?.favorito &&
      partido.resultado_sugerido.favorito !== 'empate'
        ? partido.probabilidades?.[partido.resultado_sugerido.favorito]
        : partido.probabilidades?.['empate'],
    golesEsperados: partido.goles_esperados ?? {},
  }
}

function CopyCupo({ ocupados }: { ocupados: number }) {
  const disponibles = LIMITE_PRONOSTICOS - ocupados

  if (disponibles <= 0) {
    return (
      <div className="bg-warning-50 border border-warning-500 rounded-[var(--radius-card)] p-4 text-sm text-warning-700">
        Los {LIMITE_PRONOSTICOS} lugares para esta jornada ya están ocupados. Puedes
        revisar el análisis del modelo y volver a participar en la siguiente jornada.
      </div>
    )
  }

  if (ocupados >= UMBRAL_CASI_LLENO) {
    return (
      <div className="bg-warning-50 border border-warning-500 rounded-[var(--radius-card)] p-4 text-sm text-warning-700">
        Solo quedan <strong>{disponibles} lugares</strong>. Regístralo antes de
        que se llene.
      </div>
    )
  }

  return (
    <div className="bg-info-50 border border-info-500 rounded-[var(--radius-card)] p-4 text-sm text-info-700">
      Quedan <strong>{disponibles} lugares disponibles</strong> para esta jornada.
    </div>
  )
}

function EstadoExito({ jornadaNum }: { jornadaNum: number | null }) {
  return (
    <div className="bg-success-50 border border-success-500 rounded-[var(--radius-card)] p-6 max-w-lg mx-auto text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-success-500 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="font-display font-bold text-xl text-success-700">
        Pronósticos guardados
      </h2>

      <p className="font-body text-sm text-neutral-600 leading-relaxed">
        Tus marcadores ya están registrados. Cuando arranque la jornada, aquí
        mismo podrás ver cómo quedó el análisis del modelo y qué predijo el
        resto de la comunidad. Vale la pena revisarlo partido a partido.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href={`/pronosticos?jornada=${jornadaNum}`}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-button)] bg-primary-600 text-white text-sm font-body font-semibold hover:bg-primary-700 transition-colors"
        >
          Ver análisis del modelo
        </Link>
        <Link
          href="/comunidad"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-button)] border border-neutral-300 bg-white text-neutral-700 text-sm font-body font-semibold hover:border-primary-500 hover:text-primary-700 transition-colors"
        >
          Ver pronósticos de la comunidad
        </Link>
      </div>
    </div>
  )
}

type FormState = Record<string, { golesLocal: string; golesVisitante: string }>

export default function QuinielaClient() {
  const [jornada, setJornada] = useState<number | null>(null)
  const [partidos, setPartidos] = useState<PartidoAPI[]>([])
  const [isLoadingJornada, setIsLoadingJornada] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({})
  const [email, setEmail] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cupoOcupado, setCupoOcupado] = useState<number | null>(null)

  useEffect(() => {
    setIsLoadingJornada(true)
    setLoadError(null)

    fetch(`${API_URL}/api/jornadas/proxima`)
      .then((res) => {
        if (!res.ok) {
          // Fallback: si no hay jornada próxima, usar la más reciente disponible
          return fetch(`${API_URL}/api/jornadas`)
            .then((r) => (r.ok ? r.json() : []))
            .then((lista: { jornada: number; partidos: PartidoAPI[] }[]) => {
              if (!Array.isArray(lista) || lista.length === 0)
                throw new Error('No hay jornadas disponibles.')
              return lista.sort((a, b) => b.jornada - a.jornada)[0]
            })
        }
        return res.json()
      })
      .then((data: { jornada: number; partidos: PartidoAPI[] }) => {
        setJornada(data.jornada)
        setPartidos(data.partidos)
        const initialForm: FormState = {}
        data.partidos.forEach((p) => {
          initialForm[p._id] = { golesLocal: '', golesVisitante: '' }
        })
        setForm(initialForm)

        return fetch(
          `${API_URL}/api/pronosticos/resultados-comunidad/${data.jornada}`
        )
          .then((r) => (r.ok ? r.json() : []))
          .then((resultados: unknown[]) => {
            setCupoOcupado(Array.isArray(resultados) ? resultados.length : 0)
          })
          .catch(() => setCupoOcupado(0))
      })
      .catch((err: Error) => {
        setLoadError(err.message || 'Error al cargar la jornada')
      })
      .finally(() => setIsLoadingJornada(false))
  }, [])

  const handleInputChange = (
    id: string,
    field: 'golesLocal' | 'golesVisitante',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value.replace(/[^0-9]/g, '').slice(0, 2),
      },
    }))
  }

  const fechaPrimerPartido = getFechaHoraPrimerPartido(partidos)
  const ahora = new Date()
  const pronosticoCerrado = fechaPrimerPartido
    ? (fechaPrimerPartido.getTime() - ahora.getTime()) / (1000 * 60 * 60) <= 24
    : false

  const cupoAgotado = cupoOcupado !== null && cupoOcupado >= LIMITE_PRONOSTICOS
  const formularioBloqueado = pronosticoCerrado || cupoAgotado

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setSubmitError('Por favor ingresa un correo electrónico válido.')
      return
    }

    const camposVacios = partidos.some(
      (p) => form[p._id]?.golesLocal === '' || form[p._id]?.golesVisitante === ''
    )
    if (camposVacios) {
      setSubmitError('Completa todos los marcadores antes de guardar.')
      return
    }

    const predictions = partidos.map((p) => ({
      matchId: p._id,
      golesLocal: Number(form[p._id]?.golesLocal),
      golesVisitante: Number(form[p._id]?.golesVisitante),
    }))

    for (const pred of predictions) {
      if (
        isNaN(pred.golesLocal) ||
        isNaN(pred.golesVisitante) ||
        pred.golesLocal < 0 ||
        pred.golesVisitante < 0 ||
        pred.golesLocal > 15 ||
        pred.golesVisitante > 15
      ) {
        setSubmitError('Completa todos los marcadores con números entre 0 y 15.')
        return
      }
    }

    setIsSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/pronosticos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: email, jornada, predictions }),
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(
          (result as { error?: string }).error || 'Error al guardar el pronóstico'
        )
      setSuccess(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Error al guardar el pronóstico'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading
  if (isLoadingJornada) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div
          className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent mb-4"
          aria-label="Cargando jornada"
          role="status"
        />
        <p className="text-sm font-body text-neutral-500">Cargando jornada...</p>
      </div>
    )
  }

  // Error de carga
  if (loadError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-error-50 border border-error-500 rounded-[var(--radius-card)] p-6 max-w-md mx-auto">
          <p className="font-body font-semibold text-error-700 mb-2">
            No se pudo cargar la jornada
          </p>
          <p className="text-sm text-neutral-500">{loadError}</p>
        </div>
      </div>
    )
  }

  // Sin partidos
  if (!partidos.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-warning-50 border border-warning-500 rounded-[var(--radius-card)] p-6 max-w-md mx-auto">
          <p className="font-body text-warning-700">
            No hay partidos disponibles para pronosticar en la próxima jornada.
          </p>
        </div>
      </div>
    )
  }

  // Éxito
  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <EstadoExito jornadaNum={jornada} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-2">
          Registra tus pronósticos
        </h1>
        <p className="font-body text-sm text-neutral-600 leading-relaxed">
          Escribe el marcador que crees que terminará cada partido. Tu
          predicción queda registrada y, una vez que inicie la jornada, podrás
          comparar con lo que pronosticó el modelo estadístico y con el resto
          de la comunidad.
        </p>
      </div>

      {/* Indicador de cupo */}
      {cupoOcupado !== null && !pronosticoCerrado && (
        <div className="mb-6">
          <CopyCupo ocupados={cupoOcupado} />
        </div>
      )}

      {/* Jornada cerrada */}
      {pronosticoCerrado && (
        <div className="mb-6 bg-warning-50 border border-warning-500 rounded-[var(--radius-card)] p-4 text-sm text-warning-700">
          El registro para esta jornada ya cerró. Los pronósticos se cierran 24
          horas antes del primer partido. Regresa para la siguiente jornada y
          llega temprano.
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Campo de email */}
        <div className="bg-surface-card rounded-[var(--radius-card)] border border-neutral-200 p-4">
          <label
            htmlFor="email"
            className="block text-xs font-body font-semibold text-neutral-500 uppercase tracking-wide mb-2"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-[var(--radius-input)] border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-body text-neutral-900 placeholder-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed transition"
            placeholder="tu.correo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={formularioBloqueado}
            autoComplete="email"
          />
          <p className="mt-1.5 text-xs text-neutral-400">
            Solo para identificarte. Sin contraseña ni correos de marketing.
          </p>
        </div>

        {/* Partidos */}
        <div className="space-y-3">
          {partidos.map((p) => (
            <FormularioPronostico
              key={p._id}
              partido={p}
              pronosticoModelo={buildPronosticoModelo(p)}
              value={form[p._id]}
              onChange={handleInputChange}
              disabled={formularioBloqueado}
            />
          ))}
        </div>

        {/* Error de envío */}
        {submitError && (
          <div className="bg-error-50 border border-error-500 rounded-[var(--radius-card)] p-3 text-sm text-error-700">
            {submitError}
          </div>
        )}

        {/* Botón de envío */}
        {!formularioBloqueado && (
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-[var(--radius-button)] bg-primary-600 text-white font-body font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting && (
                <span
                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  aria-hidden="true"
                />
              )}
              {isSubmitting ? 'Guardando...' : 'Guardar mis pronósticos'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
