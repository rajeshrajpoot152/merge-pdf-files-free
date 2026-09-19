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
  return constructPageMetadata({ pageKey: 'privacy-policy', lang, path: 'privacy-policy' });
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <article className="prose prose-slate max-w-none bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-xs text-slate-400 mb-6">Last Updated: September 2026</p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">1. 100% Client-Side Processing (Zero Document Uploads)</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          MergePDFFilesFree takes your confidentiality seriously. All PDF processing operations (merging, splitting, compression, image conversions) are executed exclusively within your web browser using client-side JavaScript and WebAssembly. <strong>No document files are ever uploaded to or stored on our servers.</strong>
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">2. Information We Do Not Collect</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We do not collect names, email addresses, passwords, phone numbers, or document contents. You are never required to create an account or sign in to use our utilities.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">3. Analytics & Advertising</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          We may use privacy-compliant, anonymized web analytics to monitor site performance, uptime, and general pageviews. We partner with trusted advertising networks like Google AdSense to sustain our free platform.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">4. Contacting Us</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          If you have any questions regarding this Privacy Policy, please contact us at <a href="mailto:hello@mergepdffilesfree.com" className="text-blue-600 font-bold hover:underline">hello@mergepdffilesfree.com</a>.
        </p>
      </article>
    </div>
  );
}
