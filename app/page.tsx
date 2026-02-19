import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { Tag } from "lucide-react";
import Tagline from "@/components/Tagline";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Projects />
      <Tagline />
      {/* Extra padding at bottom for fixed footer */}
      <div className="h-16" />
    </main>
  );
}
