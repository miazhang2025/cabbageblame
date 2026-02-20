'use client';

import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

export default function Hero() {
  const containerRef = useFadeInOnScroll({ duration: 1, delay: 0.3, staggerDelay: 0.15 });

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden pt-16">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Content */}
      <div className="relative text-center space-y-8 px-6 max-w-4xl mx-auto z-10">
        <div className="space-y-4" data-fade-in>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight" style={{ color: '#FFFFFF' }}>
            Artistically Driven. Technically Boundless.
          </h1>
          <p className="text-md md:text-md tracking-wide" style={{ color: '#FFFFFF' }}>
            TECH_ART / CREATIVE ENGINEERING / MOTION_GRAPHICS / IMMERSIVE EXPERIENCES
          </p>
          {/* <p className="text-md md:text-md tracking-wide" style={{ color: '#FFFFFF' }}>
            GAME / REALTIME_MEDIA
          </p> */}
        </div>

        {/* Scroll indicator */}
        <div className="pt-12 flex justify-center" data-fade-in>
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(168, 187, 202, 0.5), transparent)' }} /> */}
    </section>
  );
}
