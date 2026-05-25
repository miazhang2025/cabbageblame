'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Crimson_Text, Playfair_Display } from 'next/font/google';

const crimson = Crimson_Text({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function FlaneurPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('fl-visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fl-fade').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${crimson.variable} ${playfair.variable} fl-root`}>
      <style>{`
        .fl-root {
          --fl-red: #DC5639;
          --fl-light: #EAEAEA;
          --fl-dark: #111009;
          --fl-mid: #2a2620;
          --fl-muted: #7a7268;
          --fl-border: rgba(234,234,234,0.1);
          background: var(--fl-dark);
          color: var(--fl-light);
          font-family: var(--font-crimson), Georgia, serif;
          font-size: 18px;
          line-height: 1.75;
          min-height: 100vh;
          position: relative;
        }
        .fl-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
        .fl-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 120px 48px 80px;
          padding-top: calc(4rem + 60px);
          position: relative;
          border-bottom: 0.5px solid var(--fl-border);
        }
        .fl-back {
          position: absolute;
          top: calc(4rem + 20px);
          left: 48px;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--fl-red);
          text-decoration: none;
          font-family: var(--font-crimson), Georgia, serif;
          transition: opacity 0.2s;
        }
        .fl-back:hover { opacity: 0.7; }
        .fl-hero-eyebrow {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--fl-red);
          margin-bottom: 24px;
        }
        .fl-hero-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 900;
          font-size: clamp(64px, 10vw, 120px);
          line-height: 0.9;
          color: var(--fl-light);
          letter-spacing: -1px;
          margin-bottom: 32px;
        }
        .fl-hero-tagline {
          font-size: clamp(20px, 2.5vw, 28px);
          font-style: italic;
          color: var(--fl-muted);
          max-width: 600px;
          line-height: 1.5;
          margin-bottom: 48px;
        }
        .fl-hero-tagline em {
          color: var(--fl-light);
          font-style: italic;
        }
        .fl-hero-meta {
          display: flex;
          gap: 48px;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fl-muted);
          flex-wrap: wrap;
        }
        .fl-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fl-hero-meta-item::before {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background: var(--fl-red);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fl-hero-rule {
          position: absolute;
          top: 120px;
          right: 48px;
          width: 0.5px;
          height: 200px;
          background: linear-gradient(to bottom, transparent, var(--fl-border), transparent);
        }
        .fl-section {
          padding: 100px 48px;
          border-bottom: 0.5px solid var(--fl-border);
          position: relative;
        }
        .fl-section-number {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--fl-red);
          margin-bottom: 16px;
        }
        .fl-section-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: clamp(32px, 4vw, 52px);
          color: var(--fl-light);
          line-height: 1.1;
          margin-bottom: 48px;
          letter-spacing: -0.5px;
        }
        .fl-product-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          max-width: 1200px;
        }
        .fl-product-text p {
          font-size: 20px;
          color: var(--fl-light);
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .fl-product-text p.fl-muted-p {
          font-size: 17px;
          color: var(--fl-muted);
        }
        .fl-product-text em { color: var(--fl-red); font-style: italic; }
        .fl-pull-quote {
          font-size: 26px;
          font-style: italic;
          color: var(--fl-light);
          line-height: 1.5;
          border-left: 2px solid var(--fl-red);
          padding-left: 28px;
          margin-bottom: 40px;
          margin-top: 8px;
        }
        .fl-stat-row {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .fl-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 20px 0;
          border-bottom: 0.5px solid var(--fl-border);
        }
        .fl-stat:last-child { border-bottom: none; }
        .fl-stat-label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fl-muted);
        }
        .fl-stat-value {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 32px;
          color: var(--fl-light);
          line-height: 1;
        }
        .fl-stat-sub {
          font-size: 14px;
          color: var(--fl-muted);
          font-style: italic;
        }
        .fl-philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--fl-border);
          border: 0.5px solid var(--fl-border);
          max-width: 1200px;
        }
        .fl-philosophy-cell {
          background: var(--fl-dark);
          padding: 48px 36px;
          transition: background 0.3s;
        }
        .fl-philosophy-cell:hover { background: var(--fl-mid); }
        .fl-philosophy-num {
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--fl-red);
          margin-bottom: 20px;
          font-family: monospace;
        }
        .fl-philosophy-heading {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 24px;
          color: var(--fl-light);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .fl-philosophy-body {
          font-size: 16px;
          color: var(--fl-muted);
          line-height: 1.7;
        }
        .fl-scoring-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          max-width: 1000px;
        }
        .fl-score-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .fl-score-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .fl-score-name { font-size: 18px; color: var(--fl-light); }
        .fl-score-pct {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 36px;
          color: var(--fl-red);
          line-height: 1;
        }
        .fl-score-bar-bg { height: 2px; background: var(--fl-border); width: 100%; }
        .fl-score-bar { height: 2px; background: var(--fl-red); }
        .fl-score-desc { font-size: 14px; color: var(--fl-muted); font-style: italic; }
        .fl-neighborhood-list { max-width: 900px; }
        .fl-neighborhood-item {
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 32px;
          align-items: baseline;
          padding: 24px 0;
          border-bottom: 0.5px solid var(--fl-border);
          transition: all 0.2s;
        }
        .fl-neighborhood-item:first-child { border-top: 0.5px solid var(--fl-border); }
        .fl-neighborhood-item:hover .fl-n-name { color: var(--fl-red); }
        .fl-n-name {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 20px;
          color: var(--fl-light);
          transition: color 0.2s;
        }
        .fl-n-tags { font-size: 15px; color: var(--fl-muted); font-style: italic; }
        .fl-n-status {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fl-red);
          font-family: monospace;
        }
        .fl-n-status-fallback {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fl-muted);
          font-family: monospace;
        }
        .fl-tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--fl-border);
          border: 0.5px solid var(--fl-border);
          max-width: 1000px;
        }
        .fl-tech-cell { background: var(--fl-dark); padding: 36px 32px; }
        .fl-tech-label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fl-muted);
          margin-bottom: 12px;
          font-family: monospace;
        }
        .fl-tech-value { font-size: 20px; color: var(--fl-light); }
        .fl-scope-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          max-width: 900px;
        }
        .fl-scope-col h3 {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 20px;
          color: var(--fl-light);
          margin-bottom: 24px;
        }
        .fl-scope-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .fl-scope-list li {
          font-size: 16px;
          color: var(--fl-muted);
          display: flex;
          gap: 12px;
          align-items: flex-start;
          line-height: 1.5;
        }
        .fl-scope-list li::before {
          content: '—';
          color: var(--fl-red);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .fl-scope-list-out li::before { color: rgba(234,234,234,0.15); }
        .fl-footer {
          padding: 60px 48px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .fl-footer-logo {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 900;
          font-size: 48px;
          color: var(--fl-light);
          opacity: 0.15;
          letter-spacing: 2px;
        }
        .fl-footer-meta {
          text-align: right;
          font-size: 12px;
          color: var(--fl-muted);
          letter-spacing: 1px;
          line-height: 2;
        }
        .fl-fade {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fl-visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          .fl-hero { padding: 100px 24px 60px; }
          .fl-back { left: 24px; }
          .fl-hero-rule { display: none; }
          .fl-section { padding: 64px 24px; }
          .fl-product-intro { grid-template-columns: 1fr; gap: 40px; }
          .fl-philosophy-grid { grid-template-columns: 1fr; }
          .fl-neighborhood-item { grid-template-columns: 1fr; gap: 4px; }
          .fl-scoring-grid { grid-template-columns: 1fr; }
          .fl-tech-grid { grid-template-columns: 1fr; }
          .fl-scope-cols { grid-template-columns: 1fr; gap: 40px; }
          .fl-footer { flex-direction: column; gap: 24px; align-items: flex-start; }
          .fl-hero-meta { gap: 24px; }
        }
      `}</style>

      {/* Hero */}
      <div className="fl-hero">
        <div className="fl-hero-rule" />
        <Link href="/#projects" className="fl-back">← Back to projects</Link>
        <p className="fl-hero-eyebrow">iOS · Manhattan · 2025</p>
        <h1 className="fl-hero-title">Flâneur</h1>
        <p className="fl-hero-tagline"><em>The city writes its poems in music.</em></p>
        <div className="fl-hero-meta">
          <span className="fl-hero-meta-item">Location-aware music</span>
          <span className="fl-hero-meta-item">Spotify integration</span>
          <span className="fl-hero-meta-item">Swift / iOS</span>
        </div>
      </div>

      {/* 01 — Product */}
      <section className="fl-section" id="product">
        <p className="fl-section-number">01 — Product</p>
        <h2 className="fl-section-title">What is Flâneur</h2>
        <div className="fl-product-intro">
          <div className="fl-product-text fl-fade">
            <p>Flâneur is a location-aware music experience for walkers. As you move through a city, the app plays music that <em>belongs to where you are</em> — not algorithmically generic, but culturally rooted, atmospherically specific, and emotionally resonant.</p>
            <p className="fl-muted-p">The name comes from the 19th-century French concept of the urban wanderer — someone who moves through the city not to get somewhere, but to feel it. Flâneur gives that experience a soundtrack.</p>
            <p className="fl-muted-p">The origin of this idea: sitting on a school bus crossing the Brooklyn Bridge, passing through Chinatown, with In the Mood for Love playing through headphones. The city and the music collapsed into one feeling. That is the experience Flâneur is designed to reproduce — not occasionally, but every time you walk out the door.</p>
          </div>
          <div className="fl-fade">
            <blockquote className="fl-pull-quote">
              "You are not listening to music in a city. You are listening to the city."
            </blockquote>
            <div className="fl-stat-row">
              <div className="fl-stat">
                <span className="fl-stat-label">Platform</span>
                <span className="fl-stat-value">iOS</span>
                <span className="fl-stat-sub">Swift / SwiftUI, native</span>
              </div>
              <div className="fl-stat">
                <span className="fl-stat-label">V1 Coverage</span>
                <span className="fl-stat-value">Manhattan</span>
                <span className="fl-stat-sub">9 curated neighborhoods</span>
              </div>
              <div className="fl-stat">
                <span className="fl-stat-label">Music Source</span>
                <span className="fl-stat-value">Spotify</span>
                <span className="fl-stat-sub">User&apos;s existing account</span>
              </div>
              <div className="fl-stat">
                <span className="fl-stat-label">Core Interaction</span>
                <span className="fl-stat-value">Passive</span>
                <span className="fl-stat-sub">Walk. Listen. Let the city lead.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Philosophy */}
      <section className="fl-section" id="philosophy">
        <p className="fl-section-number">02 — Philosophy</p>
        <h2 className="fl-section-title">Design principles</h2>
        <div className="fl-philosophy-grid fl-fade">
          <div className="fl-philosophy-cell">
            <p className="fl-philosophy-num">01</p>
            <h3 className="fl-philosophy-heading">Music leads.<br />Geography follows.</h3>
            <p className="fl-philosophy-body">The app never interrupts a song. Location changes are acknowledged only when the music naturally ends — at the end of a track, or when the user skips. The city updates your playlist on its own time, not yours.</p>
          </div>
          <div className="fl-philosophy-cell">
            <p className="fl-philosophy-num">02</p>
            <h3 className="fl-philosophy-heading">The city is<br />the interface.</h3>
            <p className="fl-philosophy-body">The map is the UI. Every design decision pushes toward minimalism — the city should breathe through the screen. UI chrome exists only to serve what&apos;s playing, and disappears otherwise.</p>
          </div>
          <div className="fl-philosophy-cell">
            <p className="fl-philosophy-num">03</p>
            <h3 className="fl-philosophy-heading">Collective<br />memory.</h3>
            <p className="fl-philosophy-body">Users can tag a location with the song in their head at that moment. Over time, each neighborhood accumulates a sonic archive — hundreds of strangers&apos; private musical memories, layered into one collective identity.</p>
          </div>
        </div>
      </section>

      {/* 03 — Algorithm */}
      <section className="fl-section">
        <p className="fl-section-number">03 — Algorithm</p>
        <h2 className="fl-section-title">Sound identity scoring</h2>
        <div className="fl-scoring-grid fl-fade">
          {[
            { name: 'Historical & Cultural', pct: 35, desc: 'What community built this place? What music is part of its DNA? Jazz in the Village, Cantonese pop in Chinatown, gospel in Harlem.' },
            { name: 'Spatial & Atmospheric', pct: 35, desc: 'What does this street feel like? Industrial, sacred, open, dense? Derived from POI data — galleries, churches, parks, nightlife.' },
            { name: 'Current Demographics', pct: 20, desc: 'What\'s popular here now? Regional Spotify charts and POI density as a proxy for contemporary neighborhood character.' },
            { name: 'Time of Day', pct: 10, desc: 'Same block, different world. Morning vs. late night modifies the playlist — a subtle layer that rewards returning to the same streets at different hours.' },
          ].map(({ name, pct, desc }) => (
            <div className="fl-score-item" key={name}>
              <div className="fl-score-header">
                <span className="fl-score-name">{name}</span>
                <span className="fl-score-pct">{pct}%</span>
              </div>
              <div className="fl-score-bar-bg">
                <div className="fl-score-bar" style={{ width: `${pct}%` }} />
              </div>
              <p className="fl-score-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — Neighborhoods */}
      <section className="fl-section" id="neighborhoods">
        <p className="fl-section-number">04 — Coverage</p>
        <h2 className="fl-section-title">Manhattan, v1</h2>
        <div className="fl-neighborhood-list fl-fade">
          {[
            { name: 'Chinatown', tags: 'Cantonese pop, HK film scores, Wong Kar-wai era', curated: true },
            { name: 'Greenwich Village', tags: 'Jazz, folk, 1960s singer-songwriter', curated: true },
            { name: 'Harlem', tags: 'Hip-hop, soul, gospel', curated: true },
            { name: 'Lower East Side', tags: 'Punk, indie rock, underground', curated: true },
            { name: 'East Village', tags: 'Art rock, downtown NYC, indie', curated: true },
            { name: 'Washington Heights', tags: 'Latin, reggaeton, merengue', curated: true },
            { name: 'Upper West Side', tags: 'Classical, chamber music', curated: true },
            { name: 'Tribeca', tags: 'Ambient, minimal, art-adjacent', curated: true },
            { name: 'SoHo', tags: 'Electronic, French pop, fashion-forward', curated: true },
            { name: 'Midtown', tags: 'POI-driven fallback', curated: false },
            { name: 'Financial District', tags: 'POI-driven fallback', curated: false },
          ].map(({ name, tags, curated }) => (
            <div className="fl-neighborhood-item" key={name}>
              <span className="fl-n-name">{name}</span>
              <span className="fl-n-tags">{tags}</span>
              {curated
                ? <span className="fl-n-status">Curated</span>
                : <span className="fl-n-status-fallback">Fallback</span>
              }
            </div>
          ))}
        </div>
      </section>

      {/* 05 — Technical */}
      <section className="fl-section" id="technical">
        <p className="fl-section-number">05 — Technical</p>
        <h2 className="fl-section-title">Stack</h2>
        <div className="fl-tech-grid fl-fade">
          {[
            ['Language', 'Swift / SwiftUI'],
            ['Location', 'CoreLocation, background GPS'],
            ['Music', 'Spotify iOS SDK + Web API'],
            ['Map', 'MapKit, custom tile style'],
            ['POI Data', 'Google Places API'],
            ['Neighborhood Data', 'Manual curation + user crowdsource'],
            ['Haptics', 'UIImpactFeedbackGenerator'],
            ['Recommendation', 'Spotify /recommendations + taste matching'],
          ].map(([label, value]) => (
            <div className="fl-tech-cell" key={label}>
              <p className="fl-tech-label">{label}</p>
              <p className="fl-tech-value">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — V1 Scope */}
      <section className="fl-section" id="v1">
        <p className="fl-section-number">06 — Roadmap</p>
        <h2 className="fl-section-title">V1 scope</h2>
        <div className="fl-scope-cols fl-fade">
          <div className="fl-scope-col">
            <h3>In scope</h3>
            <ul className="fl-scope-list">
              <li>GPS-based neighborhood detection, Manhattan</li>
              <li>Spotify OAuth login and playback</li>
              <li>Manual curation for 9 core neighborhoods</li>
              <li>POI fallback for uncurated zones</li>
              <li>Bottom music panel — play, pause, skip, queue</li>
              <li>Neighborhood transition — haptic and name overlay</li>
              <li>Basic user submission — location and song tag</li>
              <li>Custom map style</li>
            </ul>
          </div>
          <div className="fl-scope-col">
            <h3>Out of scope</h3>
            <ul className="fl-scope-list fl-scope-list-out">
              <li>Android</li>
              <li>Other cities — Paris, Shanghai in v2</li>
              <li>Full social feed</li>
              <li>Offline mode</li>
              <li>Vision model — Street View atmosphere scoring</li>
              <li>Collaborative playlists</li>
              <li>Commissioned original music</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fl-footer">
        <div className="fl-footer-logo">Flâneur</div>
        <div className="fl-footer-meta">
          <p>The city writes its poems in music.</p>
          <p>iOS · Manhattan · V1</p>
        </div>
      </footer>
    </div>
  );
}
