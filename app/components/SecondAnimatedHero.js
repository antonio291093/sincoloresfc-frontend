"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FeatureSection() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 80 }} // Animación desde la derecha
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 py-8 bg-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Imagen */}
        <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center md:justify-start">
          <Image
            src="/images/imagen2.png"
            width={512}
            height={512}
            alt="Descripción de la segunda imagen"
            className="2xl:w-[1024px]"
          />
        </div>
        {/* Texto */}
        <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col justify-center px-4 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2 text-left">
            La emoción es de los fans, la razón es de los datos.
          </h2>
          <p className="text-gray-700 text-left">
            Los resultados históricos de la Liga MX, combinados con matemáticas,
            nos permiten anticipar los resultados de cada duelo.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
