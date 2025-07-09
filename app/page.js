import AnimatedHero from "./components/AnimatedHero";
import SecondAnimatedHero from "./components/SecondAnimatedHero";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Pronósticos Liga MX Apertura 2025 | SinColoresFC.mx",
  description:
    "Predicciones, análisis y estadísticas de cada jornada del torneo Apertura 2025 de la Liga MX. Consulta favoritos, goles esperados y más.",
  keywords: [
    "Liga MX",
    "pronósticos",
    "fútbol mexicano",
    "Apertura 2025",
    "resultados",
    "estadísticas",
  ],
  openGraph: {
    title: "Pronósticos Liga MX Apertura 2025 | SinColoresFC.mx",
    description:
      "Predicciones y análisis de cada jornada de la Liga MX Apertura 2025.",
    url: "https://www.sincoloresfc.mx/",
    siteName: "SinColoresFC.mx",
    images: [
      {
        url: "https://res.cloudinary.com/dfpubv5hp/image/upload/v1752092838/banner_iwmrni.png", // Cambia por tu imagen real
        width: 1200,
        height: 630,
        alt: "Pronósticos Liga MX Apertura 2025",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pronósticos Liga MX Apertura 2025",
    description: "Predicciones y análisis de cada jornada de la Liga MX.",
    images: [
      "https://res.cloudinary.com/dfpubv5hp/image/upload/v1752092838/banner_iwmrni.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function Home() {
  return (
    <>
      <HomeClient />
      {/* Sección bajo el Navbar */}
      <AnimatedHero />
      {/* <AdPlaceholder position="between-sections" /> */}
      <SecondAnimatedHero />
      {/* Resto del contenido principal */}
    </>
  );
}
