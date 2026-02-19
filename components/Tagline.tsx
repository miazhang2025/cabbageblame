'use client';

import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

export default function Tagline() {
  const sectionRef = useFadeInOnScroll({ duration: 0.8, delay: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full py-24 px-6" style={{ backgroundColor: '#BABBCA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12" data-fade-in>
          <p className="text-md md:text-md font-light tracking-wide" style={{ color: '#FFFFFF' }}>
            baggage claim? cabbage blame.
          </p>
        </div>
      </div>
    </section>
  );
}
