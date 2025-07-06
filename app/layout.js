import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DonationBanner from "./components/DonationBanner";

export const metadata = {
  title: "SinColoresFC.mx",
  description: "Pronósticos y análisis de la Liga MX Apertura 2025.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <DonationBanner />
        <section>
          {/* Banner AdSense: leaderboard (728x90) */}
          {/* <AdPlaceholder position="top-banner" /> */}
        </section>
        <main className="flex-1 pt-[92px]">{children}</main>
        {/* // Antes del footer
        <AdPlaceholder position="footer-banner" /> */}
        <Footer />
      </body>
    </html>
  );
}
