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
        <GrainientLoader color1="#abadc4" color2="#2e06cb" color3="#5a42a9" />
        <About />
        <Projects />
        <Tagline />
      </div>
      {/* Extra padding at bottom for fixed footer */}
      <div className="h-16" />
    </main>
  );
}
