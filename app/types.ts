// Tipos de la API del backend (snake_case tal como llegan del servidor)

export interface Escudos {
  local: string
  visitante: string
}

export interface Probabilidades {
  [equipo: string]: number
  empate: number
}

export interface GolesEsperados {
  [equipo: string]: number
}

export interface FormaReciente {
  puntos_por_partido: number
  goles_anotados: number
  goles_concedidos: number
}

export interface Analisis {
  forma_reciente: { [equipo: string]: FormaReciente }
  enfrentamientos_directos: {
    promedios_goles: { [equipo: string]: number }
  }
}

// Versión camelCase del analisis para uso interno en componentes
export interface AnalisisAdaptado {
  formaReciente: { [equipo: string]: FormaReciente }
  enfrentamientosDirectos: {
    promedios_goles: { [equipo: string]: number }
  }
}

export interface ResultadoSugerido {
  favorito: string
  escudo: string
}

// Partido tal como llega de la API (snake_case)
export interface PartidoAPI {
  _id: string
  local: string
  visitante: string
  fecha: string
  hora: string
  escudos: Escudos
  probabilidades: Probabilidades
  goles_esperados: GolesEsperados
  resultado_sugerido: ResultadoSugerido
  analisis: Analisis
}

// Partido adaptado a camelCase para los componentes
export interface Partido {
  _id: string
  local: string
  visitante: string
  fecha: string
  hora: string
  escudos: Escudos
  probabilidades: Probabilidades
  golesEsperados: GolesEsperados
  resultadoSugerido: ResultadoSugerido
  analisis: AnalisisAdaptado
}

export interface Jornada {
  jornada: number
  partidos: PartidoAPI[]
}

export interface PronosticoComunidad {
  user: string
  predictions: {
    local: string
    visitante: string
    escudoLocal: string
    escudoVisitante: string
    golesLocal: number
    golesVisitante: number
    fecha: string
    hora: string
  }[]
}

export interface PartidoComparacion {
  match_id: string | null
  local: string
  visitante: string
  fecha: string | null
  goles_real_local: number | null
  goles_real_visitante: number | null
  ganador_real: 'local' | 'visitante' | 'empate' | null
  favorito_modelo: 'local' | 'visitante' | 'empate' | null
  prob_local: number | null
  prob_visitante: number | null
  prob_empate: number | null
  goles_esperados_local: number | null
  goles_esperados_visitante: number | null
  acierto: boolean | null
}

export interface JornadaResumen {
  jornada: number
  partidos: number
  con_resultado: number
  aciertos: number
  porcentaje: number | null
}

export interface ResumenModelo {
  total_partidos: number
  partidos_con_resultado: number
  aciertos_totales: number
  porcentaje_aciertos: number | null
  por_jornada: JornadaResumen[]
}
