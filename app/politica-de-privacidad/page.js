export const metadata = {
  title: "Política de Privacidad | SinColoresFC.mx",
  description:
    "Conoce cómo protegemos y tratamos tus datos personales en SinColoresFC.mx.",
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
      <p className="mb-4">
        En <strong>SinColoresFC.mx</strong> nos comprometemos a proteger tu
        privacidad. Esta política explica qué datos personales recopilamos, cómo
        los usamos y tus derechos sobre ellos.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Datos que recopilamos</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Datos de navegación: dirección IP, tipo de navegador, páginas
          visitadas.
        </li>
        <li>
          Cookies y tecnologías similares para análisis y publicidad
          personalizada (Google AdSense).
        </li>
        <li>Datos proporcionados por el usuario en formularios de contacto.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Uso de los datos</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Mejorar la experiencia de usuario y el funcionamiento del sitio.
        </li>
        <li>Mostrar anuncios personalizados a través de Google AdSense.</li>
        <li>Responder consultas o solicitudes enviadas por el usuario.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Compartición de datos</h2>
      <p className="mb-4">
        Podemos compartir datos con servicios de terceros como Google para fines
        de análisis y publicidad. Consulta la{" "}
        <a
          href="https://policies.google.com/privacy?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          Política de Privacidad de Google
        </a>
        .
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Tus derechos</h2>
      <p className="mb-4">
        Puedes ejercer tus derechos de acceso, rectificación o eliminación de
        tus datos escribiéndonos a{" "}
        <a
          href="mailto:contacto@sincoloresfc.mx"
          className="text-blue-700 underline"
        >
          contacto@sincoloresfc.mx
        </a>
        .
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Cambios en la política
      </h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar esta política para adaptarla a
        novedades legislativas o prácticas del sector. Consulta esta página
        regularmente.
      </p>
      <p className="mt-8 text-sm text-gray-500">
        Última actualización: {new Date().toLocaleDateString("es-MX")}
      </p>
    </main>
  );
}
