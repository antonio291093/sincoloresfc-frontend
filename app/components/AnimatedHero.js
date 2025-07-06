"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedHero() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full max-w-none bg-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Imagen a la izquierda */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-4 md:mb-0">
          <Image
            src="/images/Imagen1.png"
            width={512}
            height={512}
            alt="Descripción de la imagen"
            className="2xl:w-[1024px]"
          />
        </div>
        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4">
          <h2 className="text-2xl font-bold mb-2 text-left">
            La Liga MX vista desde el lado frío de los números.
          </h2>
          <p className="text-gray-700 text-left">
            Vive la pasión del fútbol mexicano con análisis y pronósticos
            exclusivos para cada jornada del Apertura 2025.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
