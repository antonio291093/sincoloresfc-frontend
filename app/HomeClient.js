"use client";
import { motion } from "framer-motion";
import AnimatedHero from "./components/AnimatedHero";
import SecondAnimatedHero from "./components/SecondAnimatedHero";

export default function HomeClient() {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white border-b border-gray-200 fixed w-full z-40 top-[40px] left-0"
      ></motion.nav>
      <motion.section
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center py-20 px-4 min-h-[10vh] bg-gradient-to-b from-blue-50 to-white"
      >
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
          Bienvenido a SinColoresFC.mx
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
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
