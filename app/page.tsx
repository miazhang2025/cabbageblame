import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Tagline from "@/components/Tagline";
import GrainientLoader from "@/components/GrainientLoader";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <div className="relative">
        <GrainientLoader color1="#5860bd" color2="#2f18b3" color3="#482ba8" />
        <About />
        <Projects />
        <Tagline />
      </div>
      {/* Extra padding at bottom for fixed footer */}
      <div className="h-16" />
    </main>
  );
}
