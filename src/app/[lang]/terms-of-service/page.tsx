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
  return constructPageMetadata({ pageKey: 'terms-of-service', lang, path: 'terms-of-service' });
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="terms-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Terms of Service</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Legal Agreement
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 mb-8 pb-4 border-b border-slate-200">
          Effective Date: September 2026
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Please read these Terms of Service (&quot;Terms&quot;) carefully before utilizing <strong>MergePDFFilesFree.com</strong> (&quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using our website, you agree to be legally bound by these terms.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Description of Service</h2>
          <p>
            MergePDFFilesFree offers free, browser-based utilities for merging, splitting, converting, and compressing PDF files without server uploads. The service is provided as-is without subscription fees or compulsory registration.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Permitted Use</h2>
          <p>
            You agree to use our services exclusively for lawful purposes. You must not:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Process any documents that contain malicious software, exploits, or illegal content.</li>
            <li>Attempt to reverse-engineer, circumvent, or impair our infrastructure through automated scraping or denial-of-service attacks.</li>
            <li>Misrepresent the source or ownership of materials processed through our utilities.</li>
          </ul>

          <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Intellectual Property Rights</h2>
          <p>
            You retain 100% of all intellectual property rights, ownership, and copyright in any documents you process using our utilities. MergePDFFilesFree does not claim any ownership, license, or rights to your processed documents.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Disclaimer of Warranties</h2>
          <p>
            The services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. MergePDFFilesFree disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2 className="text-base sm:text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, MergePDFFilesFree, its developers, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="terms-bottom-ad" format="horizontal" />
    </div>
  );
}
