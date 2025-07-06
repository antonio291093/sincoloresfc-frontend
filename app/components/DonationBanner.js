"use client";
import { motion } from "framer-motion";

export default function DonationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-yellow-100 border-b border-yellow-300 py-2 px-4 md:px-8 flex justify-center items-center z-50"
    >
      <span className="mr-3 font-medium text-yellow-800 text-sm md:text-base">
        ¿Te gusta el proyecto? ¡Apóyalo con una donación!
      </span>
      <a
        href="https://paypal.me/antonio291093?country.x=MX&locale.x=es_XC"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded transition text-sm md:text-base"
      >
        Donar
      </a>
    </motion.div>
  );
}
