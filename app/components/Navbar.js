"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleJornadaChange = (e) => {
    const jornada = e.target.value;
    if (jornada) {
      router.push(`/pronosticos?jornada=${jornada}`);
      setIsOpen(false); // Cierra el menú al seleccionar
    }
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200 fixed w-full z-40 top-[40px] left-0 pt-2"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logoHorizontal.png"
            alt="SinColoresFC"
            width={160} // Ajusta el tamaño según tu diseño
            height={48}
            priority
            className="h-auto w-auto" // Opcional: para responsividad
          />
        </Link>

        {/* Menú de escritorio */}
        <div className="hidden md:flex space-x-6 items-center">
          <select
            className="border rounded px-2 py-1"
            defaultValue=""
            onChange={handleJornadaChange}
          >
            <option value="" disabled>
              Pronósticos
            </option>
            {[...Array(17)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Jornada {i + 1}
              </option>
            ))}
          </select>
          <Link
            href="/realiza-tus-pronosticos"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Realiza tus pronósticos
          </Link>
          <Link
            href="/resultados-comunidad"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Resultados Comunidad
          </Link>
        </div>

        {/* Botón hamburguesa solo en móvil */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-gray-600 border-gray-600"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menú</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 pt-4 pb-3 space-y-2">
            <select
              className="block w-full border rounded px-2 py-1"
              defaultValue=""
              onChange={handleJornadaChange}
            >
              <option value="" disabled>
                Pronósticos
              </option>
              {[...Array(17)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Jornada {i + 1}
                </option>
              ))}
            </select>
            <Link
              href="/realiza-tus-pronosticos"
              className="block px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Realiza tus pronósticos
            </Link>
            <Link
              href="/resultados-comunidad"
              className="block px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Resultados Comunidad
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
