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
  return constructPageMetadata({ pageKey: 'security', lang, path: 'security' });
}

export default async function SecurityPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="sec-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Security & Architecture</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Privacy-First Engineering
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
          Our Security & Privacy Architecture
        </h1>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            At <strong>MergePDFFilesFree.com</strong>, security is not an afterthought; it is the fundamental architectural foundation of our entire platform. We engineered our service specifically to eliminate the severe data vulnerabilities common to traditional cloud document converters.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">1. Zero-Transmission Client-Side Execution</h2>
          <p>
            Traditional PDF platforms transmit your documents over the internet to backend processing servers. On MergePDFFilesFree, your files <strong>never leave your device</strong>. The heavy lifting is performed by client-side WebAssembly (Wasm) and JavaScript running inside your browser’s isolated sandbox.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">2. Ephemeral In-Memory Storage</h2>
          <p>
            When a document is loaded into our tools, it exists solely in your computer or mobile device’s volatile Random Access Memory (RAM). No database, temporary hard drive cache, or third-party cloud storage is ever touched. As soon as you navigate away or close your browser tab, all document fragments in memory are instantly wiped.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">🛡️ Sandboxed Browser Isolation</h3>
              <p className="text-xs text-slate-600 mt-1">Our application code executes under modern browser security standards (Content Security Policy, Cross-Origin Isolation), preventing unauthorized external script execution.</p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">🔒 HTTPS &amp; TLS Encryption</h3>
              <p className="text-xs text-slate-600 mt-1">All static assets, styles, and scripts are delivered exclusively over strict HTTPS with modern TLS encryption, ensuring complete transport integrity.</p>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">3. Responsible Vulnerability Disclosure</h2>
          <p>
            We take security seriously and welcome reports from ethical security researchers. If you identify an issue or have suggestions to strengthen our infrastructure, please report it directly to{' '}
            <a href="mailto:hello@mergepdffilesfree.com" className="text-blue-600 font-semibold underline">
              hello@mergepdffilesfree.com
            </a>.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="sec-bottom-ad" format="horizontal" />
    </div>
  );
}
