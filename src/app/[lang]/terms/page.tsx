import React from 'react';
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
  return constructPageMetadata({ pageKey: 'terms-of-service', lang, path: 'terms' });
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <article className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-xs text-slate-400 mb-6">Last Updated: September 2026</p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">1. Acceptance of Terms</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          By accessing and using MergePDFFilesFree.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">2. Permitted Use</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          MergePDFFilesFree provides free, client-side browser utilities. You may use our service for personal, academic, or commercial purposes provided you comply with all applicable local, national, and international laws.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">3. Disclaimer of Warranty</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Our services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. While our client-side software is tested to high standards, MergePDFFilesFree does not warrant that operations will be completely error-free or uninterrupted.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">4. Limitation of Liability</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          In no event shall MergePDFFilesFree or its maintainers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools.
        </p>
      </article>
    </div>
  );
}
