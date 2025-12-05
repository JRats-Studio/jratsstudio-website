import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { AboutFrameworksSplit } from "@/components/sections/AboutFrameworksSplit";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Services />
      <AboutFrameworksSplit />
      <Footer />
    </main>
  );
}
