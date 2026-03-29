'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    // Inner dot follows mouse directly (zero lag)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      // Outer ring follows with GSAP ease
      gsap.to(ring, {
        x: mouseX - 18,
        y: mouseY - 18,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    // Delegated hover: scale ring on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-skill-pill], [data-exp-row]')) {
        gsap.to(ring, { scale: 2, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { scale: 0.5, duration: 0.25, ease: 'power2.out' });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-skill-pill], [data-exp-row]')) {
        gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
    };

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Inner dot — exact mouse position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-100px, -100px)', // off-screen until first move
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring — lagging behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.7)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-100px, -100px)', // off-screen until first move
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
