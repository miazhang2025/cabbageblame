'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/dist/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

// Split text hook for line animations
function useSplitText() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const text = element.innerText;
    const lines = text.split('\n').filter(line => line.trim());

    // Clear the original text
    element.innerHTML = '';

    // Create wrapper for lines
    const lineWrapper = document.createElement('div');
    element.appendChild(lineWrapper);

    // Create line elements
    lines.forEach((line) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line overflow-hidden';
      lineEl.style.height = '1.2em';

      const lineContent = document.createElement('div');
      lineContent.className = 'line-content';
      lineContent.innerText = line;
      lineContent.style.transform = 'translateY(100%)';

      lineEl.appendChild(lineContent);
      lineWrapper.appendChild(lineEl);
    });

    // Animate lines on scroll
    const lineElements = element.querySelectorAll('.line-content');
    lineElements.forEach((line) => {
      gsap.to(line, {
        scrollTrigger: {
          trigger: element,
          start: 'top 100%',
          end: 'top 50%',
          scrub: 1,
        },
        y: 0,
        duration: 1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return textRef;
}

export default function About() {
  const aboutRef = useSplitText();
  const experienceRef = useSplitText();
  const skillsRef = useSplitText();
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="about" className="relative w-full min-h-screen py-24 px-6" style={{ backgroundColor: '#BABBCA' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-wide" style={{ color: '#FFFFFF' }}>ABOUT</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Text Sections with Animations */}
          <div className="space-y-12">
            {/* About */}
            <div>
              <h3 className="text-lg mb-4 tracking-wide" style={{ color: '#FFFFFF' }}>ABOUT</h3>
              <div
                ref={aboutRef}
                className="leading-relaxed text-sm md:text-base whitespace-pre-wrap"
                style={{ color: '#FFFFFF' }}
              >
                {`I am Mia Zhang, a Technical Artist specialized in VFX and Cinematics for the next generation of digital media.

Under the moniker Cabbage Blame, I synthesize technical architecture with artistic direction. My mission is to elevate real-time media into a sophisticated cinematic language, ensuring that every frame is as technically optimized as it is visually breathtaking.

With a degree in Entertainment Technology, my work bridges the gap between artistic vision and technical execution—whether through real-time VFX, procedural workflows, and real-time optimization.`}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg mb-4 tracking-wide" style={{ color: '#FFFFFF' }}>EXPERIENCE</h3>
              <div
                ref={experienceRef}
                className="leading-relaxed text-sm md:text-base whitespace-pre-wrap"
                style={{ color: '#FFFFFF' }}
              >
                {`With a background in film production and cinematic storytelling, I bring visual and narrative sensibility to technical work.

My on-set experience informs how I approach scene composition, emotional beats, and real-time rendering for live-action integration.

I've worked on multiple AAA titles and independent projects, developing pipelines that balance artistic vision with technical performance.`}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg mb-4 tracking-wide" style={{ color: '#FFFFFF' }}>SKILLS</h3>
              <div
                ref={skillsRef}
                className="leading-relaxed text-sm md:text-base whitespace-pre-wrap"
                style={{ color: '#FFFFFF' }}
              >
                {`Houdini, Unreal Engine, Unity, Maya, Blender, Substance Suite, and more.

Specializing in VFX, procedural workflows, shader development, and building scalable pipelines for production.

Real-time optimization, cinematics, animation, and virtual production technologies.`}
              </div>
            </div>
          </div>

          {/* Right Side - Draggable Images */}
          <div
            ref={containerRef}
            className="relative h-96 lg:h-full min-h-96 overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Draggable Image 1 */}
            <div
              className="draggable-image absolute cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ width: '120px', height: 'auto', left: '20px', top: '20px' }}
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
              style={{ width: '150px', height: 'auto', right: '20px', top: '60px' }}
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
              style={{ width: '130px', height: 'auto', left: '60px', bottom: '40px' }}
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
              style={{ width: '120px', height: 'auto', right: '40px', bottom: '60px' }}
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
              style={{ width: '140px', height: 'auto', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 50 }}
            >
              <img 
                src="/draggable%20images/img5.png" 
                alt="Creative" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
