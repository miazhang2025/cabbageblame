'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseFadeInOnScrollOptions {
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  ease?: string;
}

export const useFadeInOnScroll = ({
  duration = 0.8,
  delay = 0.2,
  staggerDelay = 0.1,
  ease = 'power2.out',
}: UseFadeInOnScrollOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get all children that should animate
    const elements = containerRef.current.querySelectorAll('[data-fade-in]');

    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 30 });

    // Animate each element with staggered delays
    elements.forEach((element, index) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration,
        delay: delay + index * staggerDelay,
        ease,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [duration, delay, staggerDelay, ease]);

  return containerRef;
};
