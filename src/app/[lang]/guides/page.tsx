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
  return constructPageMetadata({ pageKey: 'guides', lang, path: 'guides' });
}

export default async function GuidesPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="guides-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Guides & Tutorials</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Step-by-Step Tutorials
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
          Master In-Browser PDF Tools: Complete Guides
        </h1>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            Whether you are organizing financial receipts, preparing an academic portfolio, or sharing contracts with clients, <strong>MergePDFFilesFree.com</strong> makes PDF manipulation fast and 100% private. Below are detailed walkthroughs for all primary document operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
            {/* Guide 1: Merge */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 transition-colors">
              <span className="text-2xl">📄</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">How to Merge Multiple PDFs</h3>
              <p className="text-xs text-slate-600 mb-3">Combine multiple PDF documents into a single organized file in seconds without uploading to any remote server.</p>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700 mb-4">
                <li>Navigate to the <Link href={getUrl('')} className="text-blue-600 font-semibold underline">Merge PDF Tool</Link>.</li>
                <li>Drag and drop your PDF files into the upload zone or click browse.</li>
                <li>Use the Up and Down arrow buttons to arrange documents in your desired sequence.</li>
                <li>Click <strong>Merge PDF Files</strong> to download your combined document instantly.</li>
              </ol>
              <Link href={getUrl('')} className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center">
                Open Merge Tool &rarr;
              </Link>
            </div>

            {/* Guide 2: Split */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 transition-colors">
              <span className="text-2xl">✂️</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">How to Split a PDF Document</h3>
              <p className="text-xs text-slate-600 mb-3">Extract specific page ranges or divide multi-page documents into separate individual PDFs.</p>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700 mb-4">
                <li>Visit the <Link href={getUrl('split-pdf')} className="text-blue-600 font-semibold underline">Split PDF Tool</Link>.</li>
                <li>Select the PDF file you wish to divide.</li>
                <li>Select your splitting mode: custom page ranges, visual page selection, or split all pages.</li>
                <li>Click <strong>Split PDF</strong> to download your organized files.</li>
              </ol>
              <Link href={getUrl('split-pdf')} className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center">
                Open Split Tool &rarr;
              </Link>
            </div>

            {/* Guide 3: JPG to PDF */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 transition-colors">
              <span className="text-2xl">🖼️</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">How to Convert JPG & PNG to PDF</h3>
              <p className="text-xs text-slate-600 mb-3">Turn photos, scanned receipts, and image archives into standard PDF documents with pixel-perfect resolution.</p>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700 mb-4">
                <li>Go to the <Link href={getUrl('jpg-to-pdf')} className="text-blue-600 font-semibold underline">JPG to PDF Converter</Link>.</li>
                <li>Upload one or more JPG, JPEG, PNG, or WebP images.</li>
                <li>Reorder the images so they appear in sequence, and choose your preferred orientation.</li>
                <li>Click <strong>Convert to PDF</strong> to produce an ultra-crisp single PDF document.</li>
              </ol>
              <Link href={getUrl('jpg-to-pdf')} className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center">
                Open JPG to PDF Tool &rarr;
              </Link>
            </div>

            {/* Guide 4: Compress */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-300 transition-colors">
              <span className="text-2xl">🗜️</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">How to Compress PDF File Size</h3>
              <p className="text-xs text-slate-600 mb-3">Reduce document megabytes for easy email attachments while preserving sharp typography.</p>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700 mb-4">
                <li>Access the <Link href={getUrl('compress-pdf')} className="text-blue-600 font-semibold underline">Compress PDF Tool</Link>.</li>
                <li>Drag and drop the heavy PDF document into the tool.</li>
                <li>Click <strong>Compress PDF Now</strong> to optimize internal font streams and deduplicate objects.</li>
                <li>Download your lightweight PDF ready for instant sharing.</li>
              </ol>
              <Link href={getUrl('compress-pdf')} className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center">
                Open Compress Tool &rarr;
              </Link>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">Best Practices for Document Security</h2>
          <p>
            Whenever handling confidential papers like tax filings, IDs, medical history, or employment agreements, always ensure that the platform you choose does not retain copies on external servers. MergePDFFilesFree is uniquely engineered to execute all operations inside your local browser tab—meaning no file transmission occurs across the network.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="guides-bottom-ad" format="horizontal" />
    </div>
  );
}
