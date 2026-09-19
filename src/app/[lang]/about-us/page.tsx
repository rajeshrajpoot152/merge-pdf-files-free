import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
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
  return constructPageMetadata({ pageKey: 'about-us', lang, path: 'about-us' });
}

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="about-top-ad" format="horizontal" />
      
      <article className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">About MergePDFFilesFree</h1>
        <p className="text-slate-600 leading-relaxed text-base">
          MergePDFFilesFree was founded on a simple yet revolutionary mission: to provide the world with fast, unlimited, professional PDF tools without invading user privacy or forcing expensive subscription models.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">Our Core Philosophy: Privacy By Architecture</h2>
        <p className="text-slate-600 leading-relaxed text-base">
          Traditional web converters rely on central servers. When you upload files to those websites, your sensitive documents are temporarily stored in their cloud storage. MergePDFFilesFree operates differently: all computations run locally within your browser sandbox using WebAssembly. Your files never leave your device.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">Zero Paywalls, Zero Watermarks</h2>
        <p className="text-slate-600 leading-relaxed text-base">
          Whether you are a student submitting a project, a freelancer assembling client invoices, or an enterprise preparing compliance filings, our tools are 100% free with no watermarks and no hidden trial limits.
        </p>
      </article>

      <AdPlaceholder slotId="about-bottom-ad" format="horizontal" />
    </div>
  );
}
