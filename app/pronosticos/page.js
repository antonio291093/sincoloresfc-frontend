// app/pronosticos/page.jsx

import PronosticosClient from "./PronosticosClient";

// SEO dinámico para cada jornada
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const jornada = resolvedSearchParams?.jornada || "1";
  return {
    title: `Pronósticos Jornada ${jornada} | SinColoresFC.mx`,
    description: `Consulta los pronósticos, probabilidades y análisis de la jornada ${jornada} de la Liga MX en SinColoresFC.mx.`,
    keywords: [
      "Liga MX",
      "pronósticos",
      "jornada",
      jornada,
      "fútbol mexicano",
      "predicciones",
      "estadísticas",
    ],
    openGraph: {
      title: `Pronósticos Jornada ${jornada} | SinColoresFC.mx`,
      description: `Predicciones y análisis de la jornada ${jornada} de la Liga MX.`,
      url: `https://www.sincoloresfc.mx/pronosticos?jornada=${jornada}`,
      siteName: "SinColoresFC.mx",
      images: [
        {
          url: "https://www.sincoloresfc.mx/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Pronósticos Liga MX",
        },
      ],
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Pronósticos Jornada ${jornada} | SinColoresFC.mx`,
      description: `Predicciones y análisis de la jornada ${jornada} de la Liga MX.`,
      images: ["https://www.sincoloresfc.mx/og-image.jpg"],
    },
  };
}

// Renderiza el componente cliente (con lógica y hooks)
export default function PronosticosPage() {
  return (
    <section>
      <PronosticosClient />
    </section>
  );
}
