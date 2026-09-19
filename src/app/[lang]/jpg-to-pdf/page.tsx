import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
import JpgToPdfTool from '@/components/JpgToPdfTool';
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
  return constructPageMetadata({ pageKey: 'jpg-to-pdf', lang, path: 'jpg-to-pdf' });
}

export default async function JpgToPdfPage({ params }: PageProps) {
  const { lang } = await params;

  let langData: any = null;
  try {
    langData = require(`@/data/i18n/${lang}.json`);
  } catch (e) {
    langData = require('@/data/i18n/en.json');
  }

  const pageData = langData?.pages?.['jpg-to-pdf'] || {};
  const heroTitle = pageData.h1 || 'Convert JPG to PDF Free Online';
  const heroLead = pageData.heroLead || 'Turn your images (JPG, PNG, WebP) into professional PDF documents. 100% private, no file uploads, processed in your browser.';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <AdPlaceholder slotId="jpg-top-ad" format="horizontal" />

      {/* Main JPG to PDF Tool */}
      <JpgToPdfTool heroTitle={heroTitle} heroLead={heroLead} />

      <AdPlaceholder slotId="jpg-mid-ad" format="horizontal" />

      {/* SEO & Instructional Article */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          How to Convert Images to PDF Without Compromising Privacy
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Converting photos, scans, receipts, or screenshots into structured, multi-page PDF documents is a daily task for students, remote workers, accountants, and businesses. Whether assembling digital portfolios, submitting expense receipts, or archiving tax documents, our <strong>JPG to PDF Converter</strong> delivers instant conversion directly in your browser.
        </p>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Key Features</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base my-4">
          <li><strong>Multi-Format Image Support:</strong> Accepts JPG, JPEG, PNG, and modern WebP image formats.</li>
          <li><strong>Orientation & Margin Controls:</strong> Choose Auto-Orientation (matching image aspect ratios), Standard Portrait A4, or Landscape A4, plus customizable border margins.</li>
          <li><strong>Sequence Reordering:</strong> Easily move images up or down to set the exact page sequence before generating your PDF.</li>
          <li><strong>100% Local Processing:</strong> Images are drawn to HTML5 canvas memory and compiled locally. No photos ever cross the internet to cloud servers.</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4 mt-4 text-sm sm:text-base not-prose">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800">Can I convert multiple photos into a single PDF?</h4>
            <p className="text-slate-600 mt-1">Yes! You can select multiple images simultaneously. Each image will be converted into its own page in order within a single unified PDF file.</p>
          </div>
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800">Does this tool reduce the resolution of my photos?</h4>
            <p className="text-slate-600 mt-1">No. Full native resolution is preserved so that tiny text, receipts, handwriting, and fine photographic details remain crisp and legible.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Are there limits on the number of images?</h4>
            <p className="text-slate-600 mt-1">No. Convert dozens of images without paywalls, subscriptions, or watermarks.</p>
          </div>
        </div>
      </article>

      <AdPlaceholder slotId="jpg-bottom-ad" format="horizontal" />
    </div>
  );
}
