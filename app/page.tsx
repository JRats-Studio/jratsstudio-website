import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/ui/SectionLoader";

// Hero remains eager for LCP
import { Hero } from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services), {
  loading: () => <div className="min-h-screen bg-black/50" />
});
const AboutFrameworksSplit = dynamic(() => import("@/components/sections/AboutFrameworksSplit").then(mod => mod.AboutFrameworksSplit));
const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer));

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      
      <SectionLoader minHeight="100vh">
        <Services />
      </SectionLoader>
      
      <SectionLoader minHeight="80vh">
        <AboutFrameworksSplit />
      </SectionLoader>
      
      <SectionLoader minHeight="30vh">
        <Footer />
      </SectionLoader>
    </main>
  );
}
