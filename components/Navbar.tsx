'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Brand - Fixed to very left */}
      <div className="fixed left-6 top-0 h-16 flex items-center bg-transparent z-50">
        <Link href="/" className="font-regular text-sm tracking-wide transition px-1" style={{ color: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}>
          CABBAGEBLAME&gt;MIA_ZHANG
        </Link>
      </div>

      {/* Navigation - fixed to right */}
      <div className="fixed right-6 top-0 h-16 z-50">
        <div className="flex items-center h-16">
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/#projects" className="transition text-sm tracking-wide px-1" style={{ color: '#ffffff' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}>
              {'>'}  WORKS
            </Link>
            <Link href="/#about" className="transition text-sm tracking-wide px-1" style={{ color: '#ffffff' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}>
              {'>'}  ABOUT
            </Link>
            <Link href="/cabbage-farm" className="transition text-sm tracking-wide px-1" style={{ color: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}>
              {'>'}  CABBAGE FARM
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden px-1 transition absolute right-0"
            style={{ color: '#FFFFFF' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed top-16 right-0 px-6 py-4 space-y-3 text-right transition-opacity duration-300 opacity-100" data-mobile-menu="open">
          <Link href="/#projects" className="block text-sm tracking-wide px-1 transition" style={{ color: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}>
            WORKS
          </Link>
          <Link href="/#about" className="block text-sm tracking-wide px-1 transition" style={{ color: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}>
            ABOUT
          </Link>
          <Link href="/cabbage-farm" className="block text-sm tracking-wide px-1 transition" style={{ color: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}>
            CABBAGE FARM
          </Link>
        </div>
      )}
    </nav>
  );
}
