export const metadata = {
  title: "Política de Cookies | SinColoresFC.mx",
  description: "Conoce cómo y para qué usamos cookies en SinColoresFC.mx.",
};

export default function PoliticaDeCookies() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Política de Cookies</h1>
      <p className="mb-4">
        En <strong>SinColoresFC.mx</strong> utilizamos cookies propias y de
        terceros para mejorar tu experiencia, analizar el tráfico y mostrarte
        anuncios personalizados mediante Google AdSense.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">¿Qué son las cookies?</h2>
      <p className="mb-4">
        Las cookies son pequeños archivos que se almacenan en tu dispositivo al
        navegar por internet. Permiten recordar tus preferencias y personalizar
        el contenido.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Tipos de cookies que usamos
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Cookies técnicas:</strong> necesarias para el funcionamiento
          del sitio.
        </li>
        <li>
          <strong>Cookies analíticas:</strong> nos ayudan a entender cómo usas
          el sitio (Google Analytics).
        </li>
        <li>
          <strong>Cookies publicitarias:</strong> muestran anuncios relevantes
          (Google AdSense).
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies de terceros</h2>
      <p className="mb-4">
        Usamos servicios de Google que pueden instalar cookies en tu
        dispositivo. Consulta la{" "}
        <a
          href="https://policies.google.com/technologies/cookies?hl=es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          Política de Cookies de Google
        </a>{" "}
        para más información.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        ¿Cómo gestionar las cookies?
      </h2>
      <p className="mb-4">
        Puedes configurar tu navegador para aceptar, rechazar o eliminar cookies
        en cualquier momento. Ten en cuenta que algunas funciones pueden verse
        afectadas si desactivas las cookies.
      </p>
      <p className="mt-8 text-sm text-gray-500">
        Última actualización: {new Date().toLocaleDateString("es-MX")}
      </p>
    </main>
  );
}
