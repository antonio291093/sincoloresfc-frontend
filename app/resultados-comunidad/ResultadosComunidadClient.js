"use client";

import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ocultarCorreo(correo) {
  return correo.replace(/(.{3}).+(@.+)/, "$1***$2");
}

export default function ResultadosComunidadClient() {
  const [jornada, setJornada] = useState(1);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/pronosticos/resultados-comunidad/${jornada}`)
      .then((res) => res.json())
      .then((data) => {
        setResultados(Array.isArray(data) ? data : []); // <-- aquí el fix
        setLoading(false);
      });
  }, [jornada]);

  const handleExpand = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="jornada" className="font-semibold">
          Jornada:
        </label>
        <select
          id="jornada"
          value={jornada}
          onChange={(e) => setJornada(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[...Array(17)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Cargando resultados...</div>
      ) : resultados.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay pronósticos para esta jornada.
        </div>
      ) : (
        <div className="divide-y">
          {resultados.map((usuario, idx) => (
            <div key={idx} className="py-2">
              <button
                onClick={() => handleExpand(idx)}
                className="w-full text-left font-bold flex items-center justify-between space-x-4 p-2 bg-white rounded shadow-sm"
              >
                <span>{ocultarCorreo(usuario.user)}</span>
                <span className="text-sm text-gray-400">
                  {expandedIdx === idx ? "▲" : "▼"}
                </span>
              </button>
              {expandedIdx === idx && (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {usuario.predictions.map((pred, j) => (
                    <div
                      key={j}
                      className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-white rounded shadow w-full mb-2"
                    >
                      <div className="flex justify-center items-center gap-3 w-full">
                        {/* Recuadro rojo: escudos */}
                        <div className="flex items-center justify-center   rounded px-2 py-1">
                          <img
                            src={pred.escudoLocal}
                            alt={pred.local}
                            className="w-8 h-8"
                          />
                          <span className="mx-1 text-gray-500 font-bold">
                            VS
                          </span>
                          <img
                            src={pred.escudoVisitante}
                            alt={pred.visitante}
                            className="w-8 h-8"
                          />
                        </div>
                        {/* Recuadro verde: pronóstico */}
                        <div className="flex items-center justify-center  rounded px-4 py-1 font-bold text-lg">
                          {pred.golesLocal} - {pred.golesVisitante}
                        </div>
                      </div>

                      {/* (Opcional) Fecha y hora */}
                      <span className="text-xs text-gray-500 mt-1 sm:mt-0 sm:ml-4">
                        {new Date(pred.fecha).toLocaleDateString()} {pred.hora}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
