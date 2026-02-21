'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

export default function Tagline() {
  const sectionRef = useFadeInOnScroll({ duration: 0.8, delay: 0.2 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const trailRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create SVG for cursor trail
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', window.innerWidth.toString());
    svg.setAttribute('height', window.innerHeight.toString());
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1000';
    document.body.appendChild(svg);

    // Create trail circles
    const trail: SVGCircleElement[] = [];
    for (let i = 0; i < 20; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '0');
      circle.setAttribute('cy', '0');
      circle.setAttribute('r', ((20 - i) * 0.5).toString());
      circle.setAttribute('fill', '#CC0066');
      circle.style.opacity = (0.3 * (1 - i / 20)).toString();
      svg.appendChild(circle);
      trail.push(circle);
    }
    trailRef.current = trail;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    // Animate trail
    const animate = () => {
      let x = mouseX.current;
      let y = mouseY.current;

      trailRef.current.forEach((circle, i) => {
        circle.setAttribute('cx', x.toString());
        circle.setAttribute('cy', y.toString());

        // Smoothly follow the previous circle
        const nextCircle = trailRef.current[i - 1];
        if (nextCircle) {
          const nextX = parseFloat(nextCircle.getAttribute('cx') || '0');
          const nextY = parseFloat(nextCircle.getAttribute('cy') || '0');
          x += (nextX - x) * 0.3;
          y += (nextY - y) * 0.3;
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Resize SVG on window resize
    const handleResize = () => {
      svg.setAttribute('width', window.innerWidth.toString());
      svg.setAttribute('height', window.innerHeight.toString());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(svg);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 px-6" style={{ backgroundColor: '#BABBCA' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={containerRef} className="text-center py-12" data-fade-in>
          <p className="text-md md:text-md font-light tracking-wide" style={{ color: '#FFFFFF' }}>
            baggage claim? cabbage blame.
          </p>
        </div>
      </div>
    </section>
  );
}
