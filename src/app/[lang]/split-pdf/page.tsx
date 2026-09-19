import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
import SplitPdfTool from '@/components/SplitPdfTool';
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
  return constructPageMetadata({ pageKey: 'split-pdf', lang, path: 'split-pdf' });
}

export default async function SplitPdfPage({ params }: PageProps) {
  const { lang } = await params;

  let langData: any = null;
  try {
    langData = require(`@/data/i18n/${lang}.json`);
  } catch (e) {
    langData = require('@/data/i18n/en.json');
  }

  const pageData = langData?.pages?.['split-pdf'] || {};
  const heroTitle = pageData.h1 || 'Split PDF Files Free Online';
  const heroLead = pageData.heroLead || 'Extract specific pages or separate every single page into separate documents instantly. 100% private with zero server uploads.';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <AdPlaceholder slotId="split-top-ad" format="horizontal" />

      {/* Main Split Tool */}
      <SplitPdfTool heroTitle={heroTitle} heroLead={heroLead} />

      <AdPlaceholder slotId="split-mid-ad" format="horizontal" />

      {/* SEO & Instructional Article */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          How to Split PDF Files and Extract Pages Online Safely
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Often you only need a single chapter from an eBook, a couple of pages from a lengthy financial report, or specific receipts from a scanned statement. <strong>MergePDFFilesFree Split PDF Engine</strong> provides high-speed, zero-upload document separation directly inside your web browser.
        </p>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Three Flexible Ways to Split</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base my-4">
          <li><strong>Custom Page Ranges:</strong> Specify exact spans (e.g. <code>1-5, 8, 11-14</code>). You can combine them into a single file or export each range as a standalone PDF bundled in a ZIP.</li>
          <li><strong>Visual Page Extraction:</strong> Click on individual page cards to hand-pick the exact sheets you wish to keep in your final document.</li>
          <li><strong>Split Every Page:</strong> Explode every page of your PDF into separate individual documents packaged into a convenient ZIP archive with one click.</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4 mt-4 text-sm sm:text-base not-prose">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800">Can I split password-protected PDFs?</h4>
            <p className="text-slate-600 mt-1">For security reasons, documents must have standard read access so the browser engine can render and separate page streams.</p>
          </div>
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800">Do you save or log my split files?</h4>
            <p className="text-slate-600 mt-1">Never. Your document never leaves your local computer or phone. All processing is 100% in-browser WebAssembly memory.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Is there any limit to file size or page count?</h4>
            <p className="text-slate-600 mt-1">No artificial server caps exist. You can split documents with hundreds of pages as long as your device has sufficient memory.</p>
          </div>
        </div>
      </article>

      <AdPlaceholder slotId="split-bottom-ad" format="horizontal" />
    </div>
  );
}
