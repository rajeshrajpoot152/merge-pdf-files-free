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
  return constructPageMetadata({ pageKey: 'business', lang, path: 'business' });
}

export default async function BusinessPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="biz-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Business Solutions</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Enterprise & Business
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
          Enterprise-Grade Document Security With Zero Server Storage
        </h1>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            Modern corporate teams handle sensitive documents on a daily basis: employment agreements, financial audits, supplier contracts, patent filings, and customer invoices. Uploading these documents to random online converters exposes companies to severe compliance and confidentiality risks.
          </p>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl my-4 not-prose">
            <h3 className="text-sm font-bold text-emerald-900 flex items-center">
              <span className="mr-2 text-base">🏢</span> Built for Corporate Compliance &amp; Privacy
            </h3>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Because <strong>MergePDFFilesFree</strong> runs entirely inside the employee’s local browser sandbox, no customer records or internal trade secrets ever leak to external cloud servers. It complies with strict confidentiality guidelines including GDPR and CCPA.
            </p>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">Key Corporate Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900">⚖️ Legal &amp; Compliance Teams</h3>
              <p className="text-xs text-slate-600 mt-1.5">Combine multi-party contracts, court exhibits, NDAs, and addendums into unified discovery packets with lossless page order control.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900">📊 Accounting &amp; Finance</h3>
              <p className="text-xs text-slate-600 mt-1.5">Collate monthly invoices, expense receipts, quarterly tax filings, and bank statements without risk of financial disclosure.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900">👥 Human Resources (HR)</h3>
              <p className="text-xs text-slate-600 mt-1.5">Merge candidate resumes, background checks, benefit packages, and onboarding handbooks while keeping employee PII strictly private.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900">🚀 Sales &amp; Operations</h3>
              <p className="text-xs text-slate-600 mt-1.5">Compress oversized client proposals, presentations, and product sheets so they fly effortlessly through email attachment filters.</p>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">Zero License Fees. Zero Seat Limits.</h2>
          <p>
            Equip your entire organization without requesting IT procurement budgets or credit card approvals. Bookmark our utilities across your team's browsers for immediate, unrestricted utility.
          </p>
          <p className="pt-2">
            Have custom enterprise requirements or partnership inquiries?{' '}
            <Link href={getUrl('contact')} className="text-blue-600 font-semibold underline">
              Contact our business team
            </Link>{' '}
            or email us directly at <span className="font-semibold text-blue-600">hello@mergepdffilesfree.com</span>.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="biz-bottom-ad" format="horizontal" />
    </div>
  );
}
