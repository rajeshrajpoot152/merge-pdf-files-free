import React from 'react';
import Link from 'next/link';

interface FooterProps {
  currentLang: string;
}

export default function Footer({ currentLang }: FooterProps) {
  const getUrl = (path: string) => {
    if (!path) {
      return currentLang === 'en' ? '/' : `/${currentLang}/`;
    }
    return currentLang === 'en' ? `/${path}/` : `/${currentLang}/${path}/`;
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-2 space-y-3">
            <Link
              href={getUrl('')}
              className="inline-flex items-center bg-white px-3 py-1.5 rounded-xl shadow-xs hover:opacity-95 transition-opacity"
            >
              <img
                src="/images/logo.png"
                alt="MergePDFFilesFree"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Free, fast, and 100% private in-browser PDF utilities. Zero server uploads, zero file retention, and no watermarks.
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Made with ❤️ for PDF users worldwide
            </p>
            <div className="text-xs text-slate-500">
              Powered by{' '}
              <a
                href="https://growautoai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                GrowAutoAI
              </a>
            </div>
          </div>

          {/* Col 1: PDF Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Free Utilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={getUrl('')} className="hover:text-white transition-colors">
                  Merge PDF Files
                </Link>
              </li>
              <li>
                <Link href={getUrl('split-pdf')} className="hover:text-white transition-colors">
                  Split PDF Files
                </Link>
              </li>
              <li>
                <Link href={getUrl('jpg-to-pdf')} className="hover:text-white transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link href={getUrl('compress-pdf')} className="hover:text-white transition-colors">
                  Compress PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={getUrl('guides')} className="hover:text-white transition-colors">
                  Guides & Tutorials
                </Link>
              </li>
              <li>
                <Link href={getUrl('faq')} className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={getUrl('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={getUrl('business')} className="hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href={getUrl('education')} className="hover:text-white transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href={getUrl('about-us')} className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={getUrl('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Legal & Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={getUrl('security')} className="hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href={getUrl('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={getUrl('terms-of-service')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href={getUrl('disclaimer')} className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href={getUrl('cookies')} className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>&copy; {new Date().getFullYear()} MergePDFFilesFree.com. All rights reserved. 100% Client-Side Engine.</p>
          <span className="inline-flex items-center text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            Browser-Encrypted &bull; Zero Server Retention
          </span>
        </div>
      </div>
    </footer>
  );
}
