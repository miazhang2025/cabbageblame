'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

gsap.registerPlugin(Flip);

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  intro: string;
}

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'Immersive & Real-Time Systems', label: 'IMMERSIVE & REAL-TIME' },
  { id: 'Games & Interactive', label: 'GAMES & INTERACTIVE' },
  { id: 'Tools & Technical R&D', label: 'TOOLS & R&D' },
  { id: 'Web & Brand', label: 'WEB & BRAND' },
  { id: 'Moving Image & Film', label: 'MOVING IMAGE & FILM' },
];

export default function Projects() {
  const sectionRef = useFadeInOnScroll({ duration: 0.8, delay: 0.2, staggerDelay: 0.08 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<any>(null);

  // Fetch projects from JSON
  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Handle category click to capture state and animate
  const handleCategoryClick = (categoryId: string) => {
    if (containerRef.current) {
      // Capture state BEFORE updating category
      stateRef.current = Flip.getState('[data-flip]');
    }
    setActiveCategory(categoryId);
  };

  // Animate after DOM updates
  useEffect(() => {
    if (!containerRef.current || !stateRef.current) return;

    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      Flip.from(stateRef.current, {
        duration: 0.6,
        ease: 'expo.inOut',
        stagger: 0.05,
      });
    });
  }, [filteredProjects.length]);

  return (
    <section ref={sectionRef} id="projects" className="relative w-full py-24" style={{ backgroundColor: '#BABBCA' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 tracking-wide" style={{ color: '#FFFFFF' }} data-fade-in>SELECTED PROJECTS</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12" data-fade-in>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="text-sm tracking-wide px-1 transition duration-500"
              style={{
                color: activeCategory === category.id ? '#BABBCA' : '#FFFFFF',
                backgroundColor: activeCategory === category.id ? '#0000FF' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = '#0000FF';
                  e.currentTarget.style.color = '#BABBCA';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div
                data-flip
                data-fade-in
                className="group cursor-pointer"
              >
                {/* Project Card with Background Image */}
                <div
                  className="relative h-96 p-6 transition-all duration-500 overflow-hidden flex flex-col justify-between border border-white hover:border-[#0000FF]"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  {/* Background Image - Shows on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url('/projects/${project.id}.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 group-hover:bg-black/50 transition-all duration-500 backdrop-blur-sm"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Index */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm tracking-wide text-white">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition" style={{ color: '#0000FF' }}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Bottom content */}
                  <div className="relative z-10 space-y-4">
                    {/* Intro */}
                    <p className="text-sm leading-relaxed text-white/70 group-hover:text-white transition">
                      {project.intro}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 tracking-wide text-white"
                          style={{ border: '1px solid rgba(255, 255, 255, 0.79)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Category Badge */}
                    <div className="flex items-center">
                      <span
                        className="text-xs px-2 py-1 tracking-wide font-semibold"
                        style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: '#FFFFFF' }}>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
