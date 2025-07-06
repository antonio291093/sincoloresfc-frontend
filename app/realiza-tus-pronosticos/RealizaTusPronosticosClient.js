"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RealizaTusPronosticosClient() {
  const [jornada, setJornada] = useState(null);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({});
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);

  // Cargar la jornada próxima al montar
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/jornadas/proxima`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la jornada.");
        return res.json();
      })
      .then((data) => {
        setJornada(data.jornada);
        setPartidos(data.partidos);
        // Inicializa el formulario vacío
        const initialForm = {};
        data.partidos.forEach((p) => {
          initialForm[p._id] = { golesLocal: "", golesVisitante: "" };
        });
        setForm(initialForm);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar la jornada");
        setLoading(false);
      });
  }, []);

  // Manejar cambios en los inputs de goles
  const handleInputChange = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value.replace(/[^0-9]/g, "").slice(0, 2) }, // solo números, máx 2 dígitos
    }));
  };

  // --- Lógica para cierre de pronósticos 24h antes del primer partido ---
  const getFechaHoraPrimerPartido = () => {
    if (!partidos.length) return null;

    // Detecta si 'fecha' ya es un string ISO con hora (ej: "2025-07-11T19:00:00.000Z")
    const esISOConHora = (fecha) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(fecha);

    // Ordena partidos por fecha+hora
    const partidosOrdenados = [...partidos].sort((a, b) => {
      // Si 'fecha' ya incluye la hora, úsala directamente
      const fechaA = esISOConHora(a.fecha)
        ? new Date(a.fecha)
        : new Date(`${a.fecha}T${a.hora || "00:00"}`);
      const fechaB = esISOConHora(b.fecha)
        ? new Date(b.fecha)
        : new Date(`${b.fecha}T${b.hora || "00:00"}`);
      return fechaA - fechaB;
    });

    const primerPartido = partidosOrdenados[0];
    let fecha;

    if (esISOConHora(primerPartido.fecha)) {
      fecha = new Date(primerPartido.fecha);
    } else {
      // Si la hora está vacía, usa "00:00"
      const fechaString = `${primerPartido.fecha}T${
        primerPartido.hora || "00:00"
      }`;
      fecha = new Date(fechaString);
    }

    // Validación extra
    if (isNaN(fecha)) {
      console.error("Fecha inválida para el primer partido:", primerPartido);
      return null;
    }
    return fecha;
  };

  const fechaPrimerPartido = getFechaHoraPrimerPartido();
  // Para pruebas, puedes fijar la fecha actual:
  //const ahora = new Date("2025-07-10T08:00:00"); // O usa:
  const ahora = new Date();

  let pronosticoCerrado = false;
  if (fechaPrimerPartido) {
    const diferenciaHoras = (fechaPrimerPartido - ahora) / (1000 * 60 * 60);
    pronosticoCerrado = diferenciaHoras <= 24;
  }
  // ---------------------------------------------------------------------

  // Validar y enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validación básica
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    const predictions = partidos.map((p) => {
      const golesLocal = Number(form[p._id]?.golesLocal);
      const golesVisitante = Number(form[p._id]?.golesVisitante);
      return {
        matchId: p._id,
        golesLocal,
        golesVisitante,
      };
    });

    // Validar que todos los campos estén llenos y en rango
    for (const pred of predictions) {
      if (
        isNaN(pred.golesLocal) ||
        isNaN(pred.golesVisitante) ||
        pred.golesLocal < 0 ||
        pred.golesVisitante < 0 ||
        pred.golesLocal > 15 ||
        pred.golesVisitante > 15
      ) {
        setError("Todos los goles deben ser números entre 0 y 15.");
        return;
      }
    }

    // Enviar al backend
    try {
      const res = await fetch(`${API_URL}/api/pronosticos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: email,
          jornada,
          predictions,
        }),
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(result.error || "Error al guardar el pronóstico");
      setSuccess("¡Pronóstico enviado correctamente!");
    } catch (err) {
      setError(err.message || "Error al guardar el pronóstico");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Cargando jornada...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 py-20 text-center text-red-600 font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  if (!partidos.length) {
    return (
      <div className="p-8 py-20 text-center">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-xl mx-auto">
          <p className="text-sm text-yellow-700">
            No hay partidos disponibles para pronosticar en la próxima jornada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-4 py-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Realiza tus pronósticos{" "}
        <span className="text-blue-700">Jornada {jornada}</span>
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <label className="font-semibold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="border rounded px-3 py-2 w-72 text-center"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={pronosticoCerrado}
          />
        </div>
        <div className="space-y-4">
          {partidos.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={p.escudos.local}
                  alt={p.local}
                  width={32}
                  height={32}
                />
                <span className="font-semibold">{p.local}</span>
                <span className="mx-2 text-gray-400">vs</span>
                <span className="font-semibold">{p.visitante}</span>
                <Image
                  src={p.escudos.visitante}
                  alt={p.visitante}
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={15}
                  className="w-14 border rounded px-2 py-1 text-center"
                  placeholder="Goles local"
                  value={form[p._id]?.golesLocal || ""}
                  onChange={(e) =>
                    handleInputChange(p._id, "golesLocal", e.target.value)
                  }
                  required
                  disabled={pronosticoCerrado}
                />
                <span className="font-bold">-</span>
                <input
                  type="number"
                  min={0}
                  max={15}
                  className="w-14 border rounded px-2 py-1 text-center"
                  placeholder="Goles visitante"
                  value={form[p._id]?.golesVisitante || ""}
                  onChange={(e) =>
                    handleInputChange(p._id, "golesVisitante", e.target.value)
                  }
                  required
                  disabled={pronosticoCerrado}
                />
              </div>
              <div className="text-xs text-gray-500">
                {p.fecha &&
                  new Date(p.fecha).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            type="submit"
            disabled={pronosticoCerrado}
            className={`bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2 rounded shadow transition ${
              pronosticoCerrado ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Enviar pronóstico
          </button>
          {pronosticoCerrado && (
            <div className="text-red-600 text-sm mt-2">
              El registro de pronósticos está cerrado porque la jornada está por
              iniciar.
            </div>
          )}
          {success && (
            <div className="text-green-700 font-semibold">{success}</div>
          )}
          {error && <div className="text-red-600 font-semibold">{error}</div>}
        </div>
      </form>
    </motion.div>
  );
}
