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
  return constructPageMetadata({ pageKey: 'how-it-works', lang, path: 'how-it-works' });
}

export default async function HowItWorksPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="hiw-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">How It Works</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Architecture & Technology
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
          How Client-Side PDF Processing Works
        </h1>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            Unlike traditional PDF tools that require uploading your private documents to third-party cloud servers, <strong>MergePDFFilesFree.com</strong> is built on a <strong>100% Client-Side Architecture</strong>. This means that all computation happens directly inside your web browser.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">The 3-Step Local Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
            <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold inline-flex items-center justify-center text-xs mb-3">1</span>
              <h3 className="text-sm font-bold text-slate-900">Local Document Read</h3>
              <p className="text-xs text-slate-600 mt-1">When you select or drop a file, your web browser reads the raw binary data into memory using the standard HTML5 File API. No network request is initiated.</p>
            </div>
            <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-200">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold inline-flex items-center justify-center text-xs mb-3">2</span>
              <h3 className="text-sm font-bold text-slate-900">In-Browser Manipulation</h3>
              <p className="text-xs text-slate-600 mt-1">Compiled WebAssembly and JavaScript libraries parse, reorder, splice, or compress PDF streams right in the browser sandbox.</p>
            </div>
            <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold inline-flex items-center justify-center text-xs mb-3">3</span>
              <h3 className="text-sm font-bold text-slate-900">Direct Local Download</h3>
              <p className="text-xs text-slate-600 mt-1">The compiled output is converted to a local Blob URL and downloaded straight to your downloads folder. Once the tab closes, the RAM is automatically freed.</p>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">Comparison: Traditional Cloud vs. MergePDFFilesFree</h2>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full border border-slate-200 text-xs rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-3 text-left border-b border-slate-200">Feature</th>
                  <th className="p-3 text-left border-b border-slate-200 text-rose-600">Old Cloud Converters</th>
                  <th className="p-3 text-left border-b border-slate-200 text-emerald-700">MergePDFFilesFree</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-800">File Storage</td>
                  <td className="p-3">Uploaded to remote cloud servers</td>
                  <td className="p-3 font-bold text-emerald-600">Zero server retention (local RAM only)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Processing Speed</td>
                  <td className="p-3">Limited by upload/download internet bandwidth</td>
                  <td className="p-3 font-bold text-emerald-600">Instant CPU/GPU hardware speed</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Data Breach Risk</td>
                  <td className="p-3">High (files stored on third-party disks)</td>
                  <td className="p-3 font-bold text-emerald-600">Zero (files never touch our servers)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Subscription / Paywall</td>
                  <td className="p-3">Trial limits, monthly credit cards</td>
                  <td className="p-3 font-bold text-emerald-600">100% Free Forever with no limits</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            To learn more about our privacy commitments, review our comprehensive{' '}
            <Link href={getUrl('security')} className="text-blue-600 font-semibold underline">
              Security Protocol
            </Link>{' '}
            and{' '}
            <Link href={getUrl('privacy-policy')} className="text-blue-600 font-semibold underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="hiw-bottom-ad" format="horizontal" />
    </div>
  );
}
