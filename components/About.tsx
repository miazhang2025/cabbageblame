'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Draggable } from 'gsap/dist/Draggable';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

gsap.registerPlugin(ScrambleTextPlugin, Draggable);

export default function About() {
  const sectionRef = useFadeInOnScroll({ duration: 0.8, delay: 0.2, staggerDelay: 0.1 });
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup text scramble animations on hover
  useEffect(() => {
    const setupScramble = (element: HTMLElement | null) => {
      if (!element) return;

      const originalText = element.innerText;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scrambleText: {
            text: originalText,
            speed: 0.8,
            chars: '$s@#!?',
            revealDelay: 0.1,
          },
          duration: 0.5,
        });
      });
    };

    setupScramble(aboutRef.current);
    setupScramble(experienceRef.current);
    setupScramble(skillsRef.current);
  }, []);

  // Setup draggable images
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
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full min-h-screen py-24 px-6" style={{ backgroundColor: '#0000FF' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold mb-2 tracking-wide" style={{ color: '#FFFFFF' }} data-fade-in>I AM A</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Text Sections with Scramble Animations */}
          <div className="space-y-12">
            {/* About */}
            <div data-fade-in>
              <div
                ref={aboutRef}
                className="leading-relaxed text-sm md:text-base whitespace-pre-wrap"
                style={{ color: '#FFFFFF' }}
              >
                {`Technical Artist & Creative Engineer, focused on immersive experiences and virtual production. I build tools, pipelines, and real-time systems — procedural generation, AI workflows, VFX, shading, XR/LED/projection installs. 
                The short version: I write code to solve art problems. The longer version involves a lot of game engines, late nights, and questions like "what if we just tried—" 
                I work across different tools and media intentionally. The most interesting creative problems tend to live at the edges of disciplines, and I like being useful at those edges.
                I also make stuff purely for fun — moving images, small web experiments, creative coding projects that don't need to exist but do anyway. That lives at Cabbage Farm.`}
              </div>
            </div>

            {/* Experience */}
            <div data-fade-in>
              <h3 className="text-lg mb-2 tracking-wide" style={{ color: '#FFFFFF' }}>I worked at</h3>
              <div
                ref={experienceRef}
                className="leading-relaxed text-sm md:text-base whitespace-pre-wrap "
                style={{ color: '#FFFFFF' }}
              >
                {`Visual Endeavors - Creative Engineering — Live Entertainment & Virtual Production (Sphere, concerts, virtual production)
COSM
Technical Ops — Immersive Camera Systems
Landor & Fitch, WPP
Creative Development — Branding
Poly Art
Creative Direction — Architectural LED`}
              </div>
            </div>

            {/* Skills */}
            <div data-fade-in>
              <h3 className="text-lg mb-2 tracking-wide" style={{ color: '#FFFFFF' }}>I can do</h3>
              <div
                ref={skillsRef}
                className="leading-relaxed text-sm md:text-base whitespace-pre-wrap "
                style={{ color: '#FFFFFF' }}
              >
                {`Real-Time: Unreal, Unity, TouchDesigner, Notch, Disguise
3D & FX: Houdini, Blender, Maya, Cinema 4D, Substance, ZBrush
Code: C++, C#, Python, VEX, HLSL/GLSL, JS/TS, React
Post & Design: After Effects, Premiere, Photoshop, Figma
Version Control: Git, Perforce`}
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
      </div>
    </section>
  );
}
