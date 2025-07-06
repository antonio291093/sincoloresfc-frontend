"use client";
import { motion } from "framer-motion";

export default function HomeClient() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center py-2 px-4 min-h-[10vh] bg-gradient-to-b from-blue-50 to-white"
      >
        <p className="text-lg text-gray-700 text-center max-w-2xl">
          Pronósticos inteligentes y análisis de la Liga MX Apertura 2025.
          <br />
          Consulta probabilidades, goles esperados y el favorito de cada
          jornada.
        </p>
        {/* CTA y demás contenido */}
      </motion.section>
      {/* Resto del contenido principal */}
    </>
  );
}
