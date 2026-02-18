'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';

gsap.registerPlugin(Flip);

interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  year: number;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CAVERN TOOLKIT',
    category: 'unity',
    tags: ['UNITY', 'TOOL', 'TECH_ART', '3D'],
    year: 2025,
    description: 'Advanced toolkit for game development with procedural workflows and optimization techniques.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'BURRATA VIRTUAL PRODUCTION',
    category: 'unreal',
    tags: ['UNREAL', 'PIPELINE', 'VFXVP', 'TECH'],
    year: 2024,
    description: 'Comprehensive virtual production pipeline for cinematic real-time rendering and live performance.',
    image: 'https://images.unsplash.com/photo-1633356389849-18e941e700f3?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'SHADER SYSTEMS',
    category: 'graphics',
    tags: ['SHADER', 'VFX', 'GRAPHICS', 'TECH'],
    year: 2024,
    description: 'Custom shader development and implementation across multiple engines.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc46c2f38f1?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'PROCEDURAL ASSET GEN',
    category: 'houdini',
    tags: ['HOUDINI', 'PROCEDURAL', 'PIPELINE', '3D'],
    year: 2023,
    description: 'Procedural generation systems for assets and environments.',
    image: 'https://images.unsplash.com/photo-1579321294055-676f8938c28d?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'VFX PIPELINE',
    category: 'unreal',
    tags: ['UNREAL', 'VFX', 'PARTICLES', 'TECH'],
    year: 2023,
    description: 'Comprehensive VFX pipeline and particle system workflows.',
    image: 'https://images.unsplash.com/photo-1545239351-ef035633a474?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'HOUDINI ENGINE INTEGRATION',
    category: 'houdini',
    tags: ['HOUDINI', 'ENGINE', 'INTEGRATION', 'PIPELINE'],
    year: 2022,
    description: 'Deep integration of Houdini Engine with game engines.',
    image: 'https://images.unsplash.com/photo-1636633062117-396f59f47b45?w=600&h=400&fit=crop',
  },
];

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'unity', label: 'UNITY' },
  { id: 'unreal', label: 'UNREAL' },
  { id: 'houdini', label: 'HOUDINI' },
  { id: 'graphics', label: 'GRAPHICS' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<any>(null);

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
    <section id="projects" className="relative w-full py-24" style={{ backgroundColor: '#BABBCA' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 tracking-wide" style={{ color: '#FFFFFF' }}>SELECTED PROJECTS</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="text-sm tracking-wide px-1 transition"
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
                  e.currentTarget.style.color = '#131313';
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
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-flip
              className="group cursor-pointer"
            >
              {/* Project Card with Background Image */}
              <div
                className="relative h-96 p-6 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                style={{
                  backgroundImage: `url('${project.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(19, 19, 19, 0.15)',
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 group-hover:from-black/50 group-hover:to-black/70 transition-all duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Year and Index */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm tracking-wide text-white">{String(project.id).padStart(2, '0')}</span>
                    <span className="text-sm text-white">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 leading-tight text-white group-hover:opacity-80 transition">
                    {project.title}
                  </h3>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 space-y-4">
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-white/90">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 tracking-wide text-white"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.3)' }}
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
