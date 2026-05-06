import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowToPlay from "@/components/HowToPlay";
import Products from "@/components/Products";
import Prizes from "@/components/Prizes";
import Leaderboard from "@/components/Leaderboard";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <Hero />
      {/* Reglas de puntos al inicio (movido por solicitud del cliente) */}
      <Products />
      {/* Ranking de ganadores en tiempo real — visible alto en la página */}
      <Leaderboard />
      <HowToPlay />
      <Prizes />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
