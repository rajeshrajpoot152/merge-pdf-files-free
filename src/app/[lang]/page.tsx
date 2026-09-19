import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
import MergePdfTool from '@/components/MergePdfTool';
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
  return constructPageMetadata({ pageKey: 'index', lang, path: '' });
}

export default async function MergePdfLanguagePage({ params }: PageProps) {
  const { lang } = await params;

  let langData: any = null;
  try {
    langData = require(`@/data/i18n/${lang}.json`);
  } catch (e) {
    langData = require('@/data/i18n/en.json');
  }

  const pageData = langData?.pages?.index || {};
  const heroTitle = pageData.h1 || 'Merge PDF Files Free Online';
  const heroLead = pageData.heroLead || 'Combine multiple documents into one single PDF in seconds. 100% private in-browser processing — your files never touch any server.';
  const faqs = pageData.faqs || [
    {
      q: 'How do I combine multiple PDF files into one single PDF?',
      a: 'To combine PDF files together, drag and drop your files into the upload box or click browse. Arrange documents in your desired order using the arrow buttons, then click "Merge PDF Files" to download your unified PDF instantly with no watermark.',
    },
    {
      q: 'Can I merge JPG and PNG images together with PDF documents?',
      a: 'Yes! You can use our JPG to PDF tool to merge JPG to PDF, combine PNG to PDF, or collate photos into a unified document with lossless, pixel-perfect rendering.',
    },
    {
      q: 'How do I split a PDF file or extract specific pages?',
      a: 'Use our Split PDF Tool to visually select page ranges, extract specific pages from PDF, or divide your PDF into individual files packaged in a clean ZIP.',
    },
    {
      q: 'Can I merge and compress PDF files at the same time?',
      a: 'Yes! After combining your documents, pass the merged file to our Compress PDF Tool to shrink file size while preserving high visual quality.',
    },
    {
      q: 'Are my confidential documents safe? Is there any logging?',
      a: 'Yes, 100%. MergePDFFilesFree is built with a Privacy-First, No-Logging architecture. All processing takes place locally in your browser memory via WebAssembly with zero server uploads.',
    },
    {
      q: 'Is there any limit, subscription, or watermark added?',
      a: 'No. Our service is completely Zero Cost with no watermark, no signup required, and unrestricted document combining.',
    },
  ];

  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  const coreTools = [
    {
      name: 'Merge PDF',
      desc: 'Combine multiple PDF files into a single unified document in seconds.',
      icon: '📄',
      href: getUrl(''),
      badge: 'POPULAR',
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      name: 'Split PDF',
      desc: 'Extract specific page ranges or separate every single page into distinct PDFs.',
      icon: '✂️',
      href: getUrl('split-pdf'),
      badge: 'READY',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      name: 'Compress PDF',
      desc: 'Reduce PDF file size by up to 70% while preserving sharp vector typography.',
      icon: '🗜️',
      href: getUrl('compress-pdf'),
      badge: 'READY',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      name: 'JPG to PDF',
      desc: 'Convert JPG, PNG, and WebP photos into high-definition PDF documents.',
      icon: '🖼️',
      href: getUrl('jpg-to-pdf'),
      badge: 'READY',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Banner Ad Placeholder */}
      <AdPlaceholder slotId="top-leaderboard" format="horizontal" />

      {/* Main Tool Component */}
      <MergePdfTool heroTitle={heroTitle} heroLead={heroLead} />

      {/* Mid-Content Ad Placeholder */}
      <AdPlaceholder slotId="mid-content-ad" format="horizontal" />

      {/* 3-Step Visual Workflow */}
      <section className="my-12 py-10 px-6 sm:px-8 bg-white rounded-3xl border border-slate-200 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            One-Click Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            How to Combine PDF Files in Seconds
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Browser-native PDF joiner with zero-logging privacy and lossless document fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Drag &amp; Drop Documents</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Drop two or more PDF files into the upload zone or choose files from your local storage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Reorder Pages &amp; Files</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use intuitive up and down controls to sequence your documents into your preferred order.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Download Single PDF</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Click &quot;Merge PDF Files&quot; to combine files instantly in memory with zero watermarks and zero cost.
            </p>
          </div>
        </div>
      </section>

      {/* PDF Utilities Suite Showcase Grid */}
      <section className="my-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Full Tool Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Explore All Free PDF Tools
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Everything you need for complete in-browser document processing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {coreTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-4 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Open Tool &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="my-12 p-6 sm:p-8 bg-slate-100/70 rounded-3xl border border-slate-200">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 text-center">
          Why Millions Trust MergePDFFilesFree
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xl">🛡️</span>
            <h4 className="text-sm font-bold text-slate-900 mt-2">100% In-Browser Privacy</h4>
            <p className="text-xs text-slate-600 mt-1">Zero server uploads. Your documents never leave your machine.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xl">⚡</span>
            <h4 className="text-sm font-bold text-slate-900 mt-2">Instant Speed</h4>
            <p className="text-xs text-slate-600 mt-1">Local processing without network latency or queuing delays.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xl">🔓</span>
            <h4 className="text-sm font-bold text-slate-900 mt-2">No Watermarks</h4>
            <p className="text-xs text-slate-600 mt-1">Clean, professional output with zero logos or stamp overlays.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xl">📱</span>
            <h4 className="text-sm font-bold text-slate-900 mt-2">All Devices</h4>
            <p className="text-xs text-slate-600 mt-1">Works smoothly on iPhones, iPads, Android, Mac, and Windows.</p>
          </div>
        </div>
      </section>

      {/* 500+ Word Semantic SEO Content Section */}
      <article className="prose prose-slate max-w-none bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          How to Merge PDF Files Free Online Without Compromising Privacy
        </h2>
        
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Merging PDF files together is one of the most common productivity tasks in modern digital workflows. Whether you are assembling business reports, collating financial invoices, consolidating school assignments, or preparing legal exhibits, having a dependable and completely free PDF combiner is essential. <strong>MergePDFFilesFree.com</strong> is engineered from the ground up to solve this challenge effortlessly directly inside your browser.
        </p>

        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">
          Why Client-Side In-Browser Processing is the Safest Solution
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Unlike traditional online PDF converters that require you to upload your sensitive contracts, medical records, or confidential tax documents to a third-party cloud server, MergePDFFilesFree operates on a strict <strong>100% Client-Side Architecture</strong>. By leveraging modern WebAssembly and lightweight in-browser memory modules, all document assembly happens entirely on your own device:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base my-4">
          <li><strong>Zero Server Uploads:</strong> Your documents never leave your laptop, tablet, or smartphone.</li>
          <li><strong>Zero Data Retention:</strong> There are no temporary cloud storage buckets, logs, or databases that could leak your personal records.</li>
          <li><strong>No Watermarks or Artificial Limits:</strong> Combine as many files as you need with zero paywalls or mandatory email registrations.</li>
          <li><strong>Instant Execution:</strong> Because no file upload or download bandwidth is wasted waiting on remote servers, your PDFs are combined instantaneously.</li>
        </ul>

        {/* Localized FAQs */}
        <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-4 mt-4 text-sm sm:text-base not-prose">
          {faqs.map((faq: { q: string; a: string }, idx: number) => (
            <div key={idx} className="border-b border-slate-100 pb-3.5">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">{faq.q}</h4>
              <p className="text-slate-600 mt-1 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </article>

      {/* Bottom Leaderboard Ad Placeholder */}
      <AdPlaceholder slotId="bottom-leaderboard" format="horizontal" />
    </div>
  );
}
