// app/realiza-tus-pronosticos/page.js

import RealizaTusPronosticosClient from "./RealizaTusPronosticosClient";

// SEO dinámico para la próxima jornada
export const metadata = {
  title: "Realiza tus pronósticos | SinColoresFC.mx",
  description:
    "Haz tus pronósticos de la próxima jornada de la Liga MX en SinColoresFC.mx y compite con otros aficionados.",
  keywords: [
    "Liga MX",
    "pronósticos",
    "fútbol mexicano",
    "predicciones",
    "goles",
    "SinColoresFC",
    "apuestas",
    "quiniela",
  ],
  openGraph: {
    title: "Realiza tus pronósticos | SinColoresFC.mx",
    description:
      "Haz tus pronósticos de la próxima jornada de la Liga MX en SinColoresFC.mx.",
    url: "https://www.sincoloresfc.mx/realiza-tus-pronosticos",
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
    title: "Realiza tus pronósticos | SinColoresFC.mx",
    description:
      "Haz tus pronósticos de la próxima jornada de la Liga MX en SinColoresFC.mx.",
    images: ["https://www.sincoloresfc.mx/og-image.jpg"],
  },
};

export default function RealizaTusPronosticosPage() {
  return (
    <section>
      <RealizaTusPronosticosClient />
    </section>
  );
}
