"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PronosticosPage() {
  const searchParams = useSearchParams();
  const jornada = searchParams.get("jornada") || "1";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/jornadas/${jornada}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar los datos");
        setLoading(false);
      });
  }, [jornada]);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Cargando pronósticos...</p>
      </div>
    );
  }

  // Manejar errores
  if (error) {
    return (
      <div className="p-8 py-20 text-center text-red-600 font-semibold">
        <p>Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  // Verificar si hay datos válidos
  if (!data || !data.partidos || data.partidos.length === 0) {
    return (
      <div className="p-8 py-20 text-center">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>La jornada {jornada} aún no ha sido analizada.</strong>
                <br />
                Por favor, selecciona otra jornada en el menú superior.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-20">
      <h1 className="text-2xl font-bold mb-6">Pronósticos Jornada {jornada}</h1>
      <div className="space-y-4">
        {data.partidos.map((partido, idx) => (
          <div
            key={partido._id}
            className="bg-white rounded-lg shadow p-4 cursor-pointer transition hover:bg-blue-50"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              {/* Equipos y escudos */}
              <div className="flex items-center gap-2">
                <Image
                  src={partido.escudos.local}
                  alt={partido.local}
                  width={36}
                  height={36}
                />
                <span className="font-semibold">{partido.local}</span>
                <span className="mx-2 text-gray-400">vs</span>
                <span className="font-semibold">{partido.visitante}</span>
                <Image
                  src={partido.escudos.visitante}
                  alt={partido.visitante}
                  width={36}
                  height={36}
                />
              </div>
              {/* Probabilidades */}
              <div className="flex gap-3 text-sm">
                <span className="text-blue-700">
                  Local:{" "}
                  {(partido.probabilidades[partido.local] * 100).toFixed(0)}%
                </span>
                <span className="text-gray-500">
                  Empate: {(partido.probabilidades.empate * 100).toFixed(0)}%
                </span>
                <span className="text-pink-700">
                  Visitante:{" "}
                  {(partido.probabilidades[partido.visitante] * 100).toFixed(0)}
                  %
                </span>
              </div>
              {/* Ganador sugerido */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Favorito:</span>
                <Image
                  src={partido.resultado_sugerido.escudo}
                  alt={partido.resultado_sugerido.favorito}
                  width={28}
                  height={28}
                />
                <span className="font-bold">
                  {partido.resultado_sugerido.favorito}
                </span>
              </div>
            </div>
            {/* Detalles expandibles */}
            {expanded === idx && (
              <div className="mt-4 border-t pt-4 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold mb-1">Goles esperados</div>
                  <div>
                    {partido.local}: {partido.goles_esperados[partido.local]} |{" "}
                    {partido.visitante}:{" "}
                    {partido.goles_esperados[partido.visitante]}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">
                    Promedios últimos 3 enfrentamientos
                  </div>
                  <div>
                    {partido.local}:{" "}
                    {
                      partido.analisis.enfrentamientos_directos.promedios_goles[
                        partido.local
                      ]
                    }
                    , {partido.visitante}:{" "}
                    {
                      partido.analisis.enfrentamientos_directos.promedios_goles[
                        partido.visitante
                      ]
                    }
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Forma reciente</div>
                  <div>
                    {partido.local}:{" "}
                    {
                      partido.analisis.forma_reciente[partido.local]
                        .puntos_por_partido
                    }{" "}
                    pts/juego, goles anotados:{" "}
                    {
                      partido.analisis.forma_reciente[partido.local]
                        .goles_anotados
                    }
                    , goles concedidos:{" "}
                    {
                      partido.analisis.forma_reciente[partido.local]
                        .goles_concedidos
                    }
                  </div>
                  <div>
                    {partido.visitante}:{" "}
                    {
                      partido.analisis.forma_reciente[partido.visitante]
                        .puntos_por_partido
                    }{" "}
                    pts/juego, goles anotados:{" "}
                    {
                      partido.analisis.forma_reciente[partido.visitante]
                        .goles_anotados
                    }
                    , goles concedidos:{" "}
                    {
                      partido.analisis.forma_reciente[partido.visitante]
                        .goles_concedidos
                    }
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Fecha y hora</div>
                  <div>
                    {partido.fecha} - {partido.hora}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
