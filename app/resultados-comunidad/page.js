// app/resultados-comunidad/page.js

import ResultadosComunidadClient from "./ResultadosComunidadClient";

export const metadata = {
  title: "Resultados Comunidad | Pronósticos Liga MX",
  description:
    "Consulta los pronósticos realizados por la comunidad para cada jornada de la Liga MX.",
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados Comunidad</h1>
      <ResultadosComunidadClient />
    </main>
  );
}
