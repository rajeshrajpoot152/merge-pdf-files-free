import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
import CompressPdfTool from '@/components/CompressPdfTool';
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
  return constructPageMetadata({ pageKey: 'compress-pdf', lang, path: 'compress-pdf' });
}

export default async function CompressPdfPage({ params }: PageProps) {
  const { lang } = await params;

  let langData: any = null;
  try {
    langData = require(`@/data/i18n/${lang}.json`);
  } catch (e) {
    langData = require('@/data/i18n/en.json');
  }

  const pageData = langData?.pages?.['compress-pdf'] || {};
  const heroTitle = pageData.h1 || 'Compress PDF Files Free Online';
  const heroLead = pageData.heroLead || 'Reduce PDF file size for fast emailing and web upload. 100% private, executed locally in your browser with zero server uploads.';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <AdPlaceholder slotId="compress-top-ad" format="horizontal" />

      {/* Main Compress Tool */}
      <CompressPdfTool heroTitle={heroTitle} heroLead={heroLead} />

      <AdPlaceholder slotId="compress-mid-ad" format="horizontal" />

      {/* SEO & Instructional Article */}
      <article className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          Why In-Browser PDF Compression Matters
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          PDF documents frequently become bloated when they contain high-resolution scans, embedded font definitions, redundant metadata streams, and uncompressed vector instructions. Large files create obstacles: email providers reject attachments over 20 MB, government or academic job application portals impose strict 2 MB or 5 MB limits, and mobile devices struggle to download massive PDFs over cellular data.
        </p>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">How Our Client-Side Compressor Works</h3>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Rather than uploading your confidential contracts or tax returns to third-party cloud servers, our platform executes 100% of the optimization inside your browser's local sandbox:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base my-4">
          <li><strong>Stream Deflation:</strong> Applies standard Flate/Deflate compression to all internal text and vector instruction streams.</li>
          <li><strong>Object Stream Deduplication:</strong> Groups multiple cross-reference objects into unified compressed object streams.</li>
          <li><strong>Metadata Cleaning:</strong> Strips redundant thumbnail previews, unused fonts, and creation tags without degrading page visual layout.</li>
          <li><strong>Total Confidentiality:</strong> Your files never travel over the network, meeting strict compliance requirements like GDPR and HIPAA.</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4 mt-4 text-sm sm:text-base not-prose">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800">Will compression make text blurry?</h4>
            <p className="text-slate-600 mt-1">No. Text in PDF documents is vector-based. Our compression optimizes binary streams while preserving razor-sharp font outlines regardless of zoom level.</p>
          </div>
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800">How much file size reduction can I expect?</h4>
            <p className="text-slate-600 mt-1">Savings depend on file composition. Documents with unoptimized object tables or redundant metadata typically see 25% to 65% size reduction.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Is this compression tool completely free?</h4>
            <p className="text-slate-600 mt-1">Yes, 100% free with no watermarks, no limits on file count, and no required registration.</p>
          </div>
        </div>
      </article>

      <AdPlaceholder slotId="compress-bottom-ad" format="horizontal" />
    </div>
  );
}
