'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [jornadas, setJornadas] = useState<number[]>([])
  const [jornadaProxima, setJornadaProxima] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/jornadas`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          const nums = (data as { jornada: number }[])
            .map((j) => j.jornada)
            .sort((a, b) => a - b)
          setJornadas(nums)
        }
      })
      .catch(() => {})

    fetch(`${API_URL}/api/jornadas/proxima`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: unknown) => {
        if (data && typeof data === 'object' && 'jornada' in data) {
          setJornadaProxima((data as { jornada: number }).jornada)
        }
      })
      .catch(() => {})
  }, [])

  const handleJornadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jornada = e.target.value
    if (jornada) {
      router.push(`/pronosticos?jornada=${jornada}`)
      setIsOpen(false)
    }
  }

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const linkClass = (href: string) =>
    `px-3 py-2 rounded text-sm font-body font-medium transition-colors ${
      pathname === href
        ? 'text-primary-700 bg-primary-50'
        : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'
    }`

  return (
    <nav className="bg-white border-b border-neutral-200 fixed w-full z-40 top-0 left-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo imagen */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logoHorizontal.png"
            alt="SinColoresFC"
            width={180}
            height={45}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center gap-1">
          {/* Selector de jornadas */}
          <div className="relative">
            <select
              className="appearance-none border border-neutral-200 rounded-[var(--radius-button)] px-3 py-2 pr-8 text-sm font-body text-neutral-700 bg-white hover:border-primary-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              defaultValue=""
              onChange={handleJornadaChange}
              aria-label="Seleccionar jornada"
            >
              <option value="" disabled>
                Pronósticos
              </option>
              {jornadas.map((num) => (
                <option key={num} value={num}>
                  Jornada {num}
                  {jornadaProxima === num ? ' (actual)' : ''}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <Link href="/quiniela" className={linkClass('/quiniela')}>
            Mi Quiniela
          </Link>
          <Link href="/comunidad" className={linkClass('/comunidad')}>
            Comunidad
          </Link>
          <Link href="/clausura-2026" className={linkClass('/clausura-2026')}>
            Clausura 2026
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded border border-neutral-300 text-neutral-600 hover:bg-neutral-50 transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="px-4 pt-3 pb-4 space-y-1">
            <div className="relative">
              <select
                className="w-full appearance-none border border-neutral-200 rounded-[var(--radius-button)] px-3 py-2 pr-8 text-sm font-body text-neutral-700 bg-white"
                defaultValue=""
                onChange={handleJornadaChange}
                aria-label="Seleccionar jornada"
              >
                <option value="" disabled>
                  Pronósticos
                </option>
                {jornadas.map((num) => (
                  <option key={num} value={num}>
                    Jornada {num}
                    {jornadaProxima === num ? ' (actual)' : ''}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Link
              href="/quiniela"
              className="block px-3 py-2 rounded text-sm font-body text-neutral-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Mi Quiniela
            </Link>
            <Link
              href="/comunidad"
              className="block px-3 py-2 rounded text-sm font-body text-neutral-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Comunidad
            </Link>
            <Link
              href="/clausura-2026"
              className="block px-3 py-2 rounded text-sm font-body text-neutral-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Clausura 2026
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
