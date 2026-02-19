import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Projects />
      {/* Extra padding at bottom for fixed footer */}
      <div className="h-16" />
    </main>
  );
}
