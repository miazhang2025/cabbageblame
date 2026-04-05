'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/dist/Draggable';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

gsap.registerPlugin(Draggable, ScrollTrigger);

const experience = [
  {
    company: 'Visual Endeavors',
    role: 'Creative Engineer',
    period: '2026.1 – Present',
    description: 'Live entertainment & virtual production — Sphere, concerts, and virtual production pipelines. Built real-time tools and systems for large-scale immersive shows.',
  },
  {
    company: 'COSM',
    role: 'Technical Ops — Immersive Camera Systems',
    period: '2025',
    description: 'Operated and maintained immersive camera capture systems for dome and spatial media environments.',
  },
  {
    company: 'Landor & Fitch, WPP',
    role: 'Creative Development',
    period: '2023',
    description: 'Branding and creative development for global clients, bridging design and interactive production.',
  },
  {
    company: 'Poly Art',
    role: 'Creative Director',
    period: '2021',
    description: 'Led creative direction for architectural LED installations — concept through delivery.',
  },
];

const skillCategories = [
  {
    label: 'Real-Time',
    skills: ['Unreal Engine', 'Unity', 'TouchDesigner', 'Notch', 'Disguise'],
  },
  {
    label: '3D & FX',
    skills: ['Houdini', 'Blender', 'Maya', 'Cinema 4D', 'Substance', 'ZBrush'],
  },
  {
    label: 'Code',
    skills: ['C++', 'C#', 'Python', 'VEX', 'HLSL/GLSL', 'JS/TS', 'React'],
  },
  {
    label: 'Post & Design',
    skills: ['After Effects', 'Premiere', 'Photoshop', 'Figma', 'ComfyUI'],
  },
  {
    label: 'Version Control',
    skills: ['Git', 'Perforce'],
  },
];

export default function About() {
  const sectionRef = useFadeInOnScroll({ duration: 0.8, delay: 0.2, staggerDelay: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  // Setup draggable images + scroll animations
  useEffect(() => {
    const images = containerRef.current?.querySelectorAll('.draggable-image');
    if (images) {
      images.forEach((img) => {
        Draggable.create(img, {
          type: 'x,y',
          edgeResistance: 0.65,
          bounds: containerRef.current,
          inertia: true,
        });
      });
    }

    // Experience rows: stagger slide-in from left
    const expRows = expRef.current?.querySelectorAll('[data-exp-row]');
    if (expRows && expRows.length > 0) {
      gsap.fromTo(
        expRows,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: expRef.current,
            start: 'top 82%',
          },
          onComplete: () => { gsap.set(expRows, { clearProps: 'all' }); },
        }
      );
    }

    // Skills pills: stagger scale+fade in
    const pills = skillsRef.current?.querySelectorAll('[data-skill-pill]');
    if (pills && pills.length > 0) {
      gsap.fromTo(
        pills,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
          },
          onComplete: () => { gsap.set(pills, { clearProps: 'all' }); },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full min-h-screen py-24 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold mb-2 tracking-wide" style={{ color: '#FFFFFF' }} data-fade-in>I AM A</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Bio */}
          <div>
            {/* About */}
            <div data-fade-in>
              <div
                className="leading-relaxed text-sm whitespace-pre-wrap"
                style={{ color: '#FFFFFF' }}
              >
                {`Technical Artist & Creative Engineer who lives in the gap between code and craft.\n\nI build tools, pipelines, and real-time systems — procedural generation, AI workflows, VFX, shading, XR/LED/projection installs. But the real job is translating between disciplines: taking something broken or unfinished or technically weird and finding the creative possibility inside it. Glitches are just unexplored aesthetics.\n\nI work across tools and media on purpose. The most interesting problems don't belong to any single discipline, and I've always been more useful at the edges than the center. Whether that's writing a shader, wiring an AI pipeline, or just asking "what if we just tried—" — I'd rather figure out what a tool can't do yet than stay inside what it already can. The ideas come fast. What I care about is closing the gap between the idea and the thing you can actually hold.\n\nI also make stuff that doesn't need to exist — moving images, web experiments, creative coding projects born out of curiosity.`}
              </div>
            </div>
          </div>

          {/* Right Side - Draggable Images */}
          <div
            ref={containerRef}
            className="relative h-96 lg:h-full min-h-96 overflow-hidden cursor-grab active:cursor-grabbing"
            data-fade-in
          >
            {/* Draggable Image 1 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '150px', height: 'auto', left: '20px', top: '20px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img1.jpg" 
                alt="Design" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 2 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '190px', height: 'auto', right: '20px', top: '60px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img2.jpg" 
                alt="Motion" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 3 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '160px', height: 'auto', left: '60px', bottom: '40px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img3.jpg" 
                alt="Technical" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 4 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '150px', height: 'auto', right: '40px', bottom: '60px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img4.jpg" 
                alt="VFX" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 5 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '175px', height: 'auto', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 50 }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img5.png" 
                alt="Creative" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 6 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '140px', height: 'auto', right: '60px', top: '150px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img6.jpg" 
                alt="Portfolio" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 7 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '160px', height: 'auto', left: '30%', bottom: '80px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img7.png" 
                alt="Projects" 
                className="w-full h-auto"
              />
            </div>

            {/* Draggable Image 8 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '170px', height: 'auto', right: '30%', top: '20px' }}
              data-fade-in
            >
              <img 
                src="/draggable%20images/img8.jpg" 
                alt="Work" 
                className="w-full h-auto"
              />
            </div>
            <p className='opacity-50 text-center'>drag me crazy :)</p>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-20" ref={expRef} data-fade-in>
          <h3 className="text-lg mb-6 tracking-wide" style={{ color: '#FFFFFF' }}>I worked at</h3>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            {experience.map((job) => (
              <div
                key={job.company}
                data-exp-row
                onMouseEnter={() => setHoveredJob(job.company)}
                onMouseLeave={() => setHoveredJob(null)}
                className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-6 cursor-default"
                style={{
                  transition: 'opacity 0.3s ease',
                  opacity: hoveredJob !== null && hoveredJob !== job.company ? 0.3 : 1,
                }}
              >
                <div className="md:col-span-1">
                  <p className="font-semibold text-sm tracking-wide" style={{ color: '#FFFFFF' }}>{job.company}</p>
                  <p className="text-xs mt-0.5 opacity-70" style={{ color: '#FFFFFF' }}>{job.role}</p>
                  <p className="text-xs mt-1 opacity-50" style={{ color: '#FFFFFF' }}>{job.period}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm leading-relaxed opacity-80" style={{ color: '#FFFFFF' }}>{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-16" ref={skillsRef} data-fade-in>
          <h3 className="text-lg mb-6 tracking-wide" style={{ color: '#FFFFFF' }}>I can do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <p className="text-xs uppercase tracking-widest mb-3 opacity-50" style={{ color: '#FFFFFF' }}>{cat.label}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      data-skill-pill
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.color = '#0000FF';
                        e.currentTarget.style.borderColor = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                      }}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        border: '1px solid rgba(255,255,255,0.5)',
                        color: '#FFFFFF',
                        backgroundColor: 'transparent',
                        transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                        cursor: 'default',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
