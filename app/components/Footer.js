"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-100 mt-auto py-8 text-center text-gray-600"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 px-4">
        <Link
          href="/"
          className="text-blue-700 font-bold text-lg hover:underline"
        >
          SinColoresFC
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/politica-de-privacidad" className="hover:underline">
            Política de Privacidad
          </Link>
          <Link href="/politica-de-cookies" className="hover:underline">
            Política de Cookies
          </Link>
          <Link href="/aviso-legal" className="hover:underline">
            Aviso Legal
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contacto
          </Link>
        </nav>
        <div className="flex gap-4 justify-center text-xl">
          <a href="#" aria-label="Twitter" className="hover:text-blue-500">
            🐦
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-700">
            📘
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500">
            📸
          </a>
        </div>
        <div className="text-xs text-gray-400 pt-2">
          © {new Date().getFullYear()} SinColoresFC.mx. Todos los derechos
          reservados.
        </div>
      </div>
    </motion.footer>
  );
}
