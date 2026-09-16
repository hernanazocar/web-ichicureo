import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import UpcomingProjects from "@/components/UpcomingProjects";
import SoldProjects from "@/components/SoldProjects";
import InvestmentSection from "@/components/InvestmentSection";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <UpcomingProjects />
      <SoldProjects />
      <InvestmentSection />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
