'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';

gsap.registerPlugin(Draggable);

interface CabbageProject {
  id: string;
  title: string;
  tags: string[];
  intro: string;
  status: 'done' | 'wip';
}

export default function CabbageFarm() {
  const [projects, setProjects] = useState<CabbageProject[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  // Fetch projects from JSON
  useEffect(() => {
    fetch('/cabbage-farm.json')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  useEffect(() => {
    if (!containerRef.current || projects.length === 0) return;

    const cards = containerRef.current.querySelectorAll('[data-card]') as NodeListOf<HTMLElement>;
    cardsRef.current = Array.from(cards);

    // Initialize card positions with rotation
    cards.forEach((card, index) => {
      gsap.set(card, {
        rotationZ: gsap.utils.random(-2, 2),
      });
    });

    // Set up click handlers
    const handleCardClick = () => {
      // Animate current card out
      const currentCard = cards[currentIndex];
      gsap.to(currentCard, {
        y: 300,
        opacity: 0,
        rotationZ: gsap.utils.random(-5, 5),
        duration: 0.4,
        ease: 'back.in',
        onComplete: () => {
          // Reset card properties after animation for next loop
          gsap.set(currentCard, {
            y: 0,
            opacity: 1,
            rotationZ: gsap.utils.random(-2, 2),
            zIndex: projects.length - currentIndex,
          });
        },
      });

      // Calculate next index (loop back to 0 at the end)
      const nextIdx = (currentIndex + 1) % projects.length;

      // Animate next card in and bring it to front
      const nextCard = cards[nextIdx];
      gsap.set(nextCard, {
        zIndex: projects.length + 1, // Bring to front
      });
      
      gsap.fromTo(
        nextCard,
        { scale: 0.95, opacity: 0, y: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out',
        }
      );

      setCurrentIndex(nextIdx);
    };

    cards[currentIndex]?.addEventListener('click', handleCardClick);

    return () => {
      cards[currentIndex]?.removeEventListener('click', handleCardClick);
    };
  }, [currentIndex, projects]);

  const getStatusColor = (status: string) => {
    return status === 'done' ? '#00FF00' : '#FFA500';
  };

  return (
    <section className="relative w-full min-h-screen pt-24 pb-16" style={{ backgroundColor: '#BABBCA' }}>
      <div className="max-w-4xl mx-auto px-6 h-full flex flex-col">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide" style={{ color: '#FFFFFF' }}>
          CABBAGE FARM
        </h2>
        <p className="text-lg mb-12" style={{ color: '#ffffff80' }}>
          Personal projects, funny ideas, and creative experiments
        </p>

        {projects.length > 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full h-96 perspective">
              <div ref={containerRef} className="relative w-full h-full">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    data-card
                    className="absolute inset-0 cursor-pointer"
                    style={{
                      zIndex: projects.length - index,
                    }}
                  >
                    <div
                      className="w-full h-full p-8 rounded-lg border-2 border-black transition-all duration-300 flex flex-col justify-between hover:border-blue-400"
                      style={{ backgroundColor: '#FFFFFF' }}
                    >
                      {/* Header */}
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-3xl font-bold" style={{ color: '#000000' }}>
                            {project.title}
                          </h3>
                          <span
                            className="text-xs px-3 py-1 tracking-wide font-bold rounded"
                            style={{
                              color: '#000000',
                              backgroundColor: getStatusColor(project.status),
                            }}
                          >
                            {project.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Intro */}
                        <p className="text-base leading-relaxed mb-6" style={{ color: '#000000' }}>
                          {project.intro}
                        </p>
                      </div>

                      {/* Tags and Footer */}
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 tracking-wide"
                              style={{
                                color: '#000000',
                                border: '1px solid rgba(0, 0, 0, 0.5)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Click hint */}
                        <div className="mt-6 text-sm" style={{ color: '#00000080' }}>
                          Click card to see next project →
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-8 right-8 text-center">
              <p className="text-sm tracking-wide" style={{ color: '#ffffff80' }}>
                {currentIndex + 1} / {projects.length}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg" style={{ color: '#ffffff80' }}>
              Loading projects...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
