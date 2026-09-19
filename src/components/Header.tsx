'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supportedLanguages } from '@/lib/constants';

interface HeaderProps {
  currentLang: string;
}

export default function Header({ currentLang }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const homePath = currentLang === 'en' ? '/' : `/${currentLang}/`;

  const getUrlForTool = (tool: string) => {
    return currentLang === 'en' ? `/${tool}/` : `/${currentLang}/${tool}/`;
  };

  const handleLanguageChange = (newLang: string) => {
    const dest = newLang === 'en' ? '/' : `/${newLang}/`;
    window.location.href = dest;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href={homePath} className="flex items-center gap-2 group">
          <img
            src="/images/logo.png"
            alt="MergePDFFilesFree"
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-[1.02] transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
          <Link href={homePath} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
            Merge PDF
          </Link>
          <Link href={getUrlForTool('split-pdf')} className="text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-colors">
            Split PDF
          </Link>
          <Link href={getUrlForTool('jpg-to-pdf')} className="text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-colors">
            JPG to PDF
          </Link>
          <Link href={getUrlForTool('compress-pdf')} className="text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-colors">
            Compress PDF
          </Link>
        </nav>

        {/* Language Switcher & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <div className="relative inline-block text-left">
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label="Change Language"
            >
              {supportedLanguages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-sm font-semibold">
          <Link
            href={homePath}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-600"
          >
            Merge PDF
          </Link>
          <Link
            href={getUrlForTool('split-pdf')}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Split PDF
          </Link>
          <Link
            href={getUrlForTool('jpg-to-pdf')}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            JPG to PDF
          </Link>
          <Link
            href={getUrlForTool('compress-pdf')}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Compress PDF
          </Link>
        </div>
      )}
    </header>
  );
}
