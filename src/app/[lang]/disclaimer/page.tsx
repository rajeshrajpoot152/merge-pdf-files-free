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
  return constructPageMetadata({ pageKey: 'disclaimer', lang, path: 'disclaimer' });
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="disclaimer-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Disclaimer</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Legal Terms
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
          Legal Disclaimer & Limitations of Service
        </h1>
        <p className="text-xs text-slate-500 italic mb-6">Last updated: September 2026</p>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            The information and document processing utilities provided on <strong>MergePDFFilesFree.com</strong> (&quot;the Website&quot;) are offered for general informational and productivity purposes only. By accessing or utilizing our tools, you agree to the disclaimers set forth below.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">1. &quot;As-Is&quot; and &quot;As-Available&quot; Provision</h2>
          <p>
            All tools, features, scripts, and documentation on MergePDFFilesFree.com are provided strictly on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">2. Document Integrity &amp; Backup Responsibility</h2>
          <p>
            While our tools are developed using industry-standard libraries to guarantee accurate PDF merging, splitting, and conversion, digital document manipulation carries inherent risks of file corruption or format discrepancy. Users are solely responsible for maintaining backup copies of their original documents before processing. MergePDFFilesFree.com will not be liable for any accidental loss of data or corruption.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">3. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted under applicable law, in no event shall MergePDFFilesFree.com, its developers, operators, or affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of the use or inability to use our services.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">4. Questions &amp; Legal Inquiries</h2>
          <p>
            If you have any questions regarding this disclaimer, please contact our legal and administrative team via email at{' '}
            <a href="mailto:hello@mergepdffilesfree.com" className="text-blue-600 font-semibold underline">
              hello@mergepdffilesfree.com
            </a>.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="disclaimer-bottom-ad" format="horizontal" />
    </div>
  );
}
