import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
import Link from 'next/link';
import { staticLangParams } from '@/lib/constants';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateStaticParams() {
  return staticLangParams;
}


interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return constructPageMetadata({ pageKey: 'cookies', lang, path: 'cookies' });
}

export default async function CookiesPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="cookie-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Cookie Policy</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Digital Privacy Protocol
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
          Cookie Policy & Local Storage Protocol
        </h1>
        <p className="text-xs text-slate-500 italic mb-6">Last updated: September 2026</p>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            At <strong>MergePDFFilesFree.com</strong>, we believe in radical digital privacy. Unlike most websites that fill your browser with dozens of tracking cookies, ad retargeting pixels, and user profiling scripts, our approach is minimalist and respectful.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">1. Do We Use Cookies?</h2>
          <p>
            MergePDFFilesFree.com <strong>does not use third-party advertising cookies or behavioral tracking cookies</strong>. We do not track your browsing history across the web, nor do we sell or monetize your session information.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">2. Local Storage Usage</h2>
          <p>
            Rather than legacy cookies, our website may occasionally utilize your browser’s standard <code>localStorage</code> or <code>sessionStorage</code> APIs for essential operational preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Language Preference:</strong> Remembering your selected language preference across page views so you don’t have to re-select it.</li>
            <li><strong>UI State:</strong> Remembering dismissible notification banners or dark/light display settings if enabled.</li>
          </ul>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">3. How to Clear or Disable Local Storage</h2>
          <p>
            You can clear or disable cookies and local storage at any time directly through your web browser’s settings (typically located under Privacy &amp; Security &rarr; Clear Browsing Data). Disabling local storage will not affect your ability to merge, split, or compress PDF files.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">4. Contact Our Privacy Team</h2>
          <p>
            If you have questions about our cookie policy or local storage implementation, please reach out to{' '}
            <a href="mailto:hello@mergepdffilesfree.com" className="text-blue-600 font-semibold underline">
              hello@mergepdffilesfree.com
            </a>.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="cookie-bottom-ad" format="horizontal" />
    </div>
  );
}
