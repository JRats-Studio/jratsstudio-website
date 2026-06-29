import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/ui/SectionLoader";

// Hero remains eager for LCP
import { Hero } from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services), {
  loading: () => <div className="min-h-screen bg-black/50" />
});
const AboutFrameworksSplit = dynamic(() => import("@/components/sections/AboutFrameworksSplit").then(mod => mod.AboutFrameworksSplit));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects), {
  loading: () => <div className="min-h-screen bg-black/50" />
});
const ConsoleSandbox = dynamic(() => import("@/components/sections/ConsoleSandbox").then(mod => mod.ConsoleSandbox), {
  loading: () => <div className="min-h-[40vh] bg-black/50" />
});
const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer));

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      
      <div id="services">
        <SectionLoader minHeight="100vh">
          <Services />
        </SectionLoader>
      </div>
      
      <div id="about">
        <SectionLoader minHeight="80vh">
          <AboutFrameworksSplit />
        </SectionLoader>
      </div>

      <div id="projects">
        <SectionLoader minHeight="80vh">
          <Projects />
        </SectionLoader>
      </div>

      <div id="sandbox">
        <SectionLoader minHeight="50vh">
          <ConsoleSandbox />
        </SectionLoader>
      </div>
      
      <div id="connect">
        <SectionLoader minHeight="30vh">
          <Footer />
        </SectionLoader>
      </div>
    </main>
  );
}
