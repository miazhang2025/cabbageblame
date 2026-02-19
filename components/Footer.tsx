'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="fixed bottom-0 w-full bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="text-sm tracking-wide" style={{ color: '#FFFFFF' }}>
            Copyright © 2025 CABBAGE_BLAME. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex gap-6 items-center">
            <Link
              href="https://github.com/miazhang2025"
              target="_blank"
              rel="noopener noreferrer"
              className="transition text-sm tracking-wide px-1"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              GITHUB
            </Link>
            <Link
              href="https://www.instagram.com/cabbage_blame/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition text-sm tracking-wide px-1"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              INSTAGRAM
            </Link>
            <Link
              href="https://www.linkedin.com/in/deyinzhang/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition text-sm tracking-wide px-1"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              LINKEDIN
            </Link>
            <Link
              href="mailto:miazhang2025@gmail.com"
              className="transition text-sm tracking-wide px-1"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0000FF'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
            >
              EMAIL
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
