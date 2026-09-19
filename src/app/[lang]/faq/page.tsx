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
  return constructPageMetadata({ pageKey: 'faq', lang, path: 'faq' });
}

export default function FaqPage() {
  const faqs = [
    {
      q: 'Are my uploaded PDF files saved on your servers?',
      a: 'No. Never. All document processing is performed 100% locally on your computer, tablet, or smartphone using client-side WebAssembly and modern JavaScript. Your files are never uploaded, stored, logged, or viewed by anyone.',
    },
    {
      q: 'Is MergePDFFilesFree really 100% free with no limits?',
      a: 'Yes! There are no daily conversion limits, no subscription paywalls, and no account creation required. You can merge, split, convert, and compress as many documents as you need.',
    },
    {
      q: 'Do you add watermarks to merged or converted documents?',
      a: 'No. We never insert watermarks, logos, or advertising into your PDFs. Your generated files remain clean and professional.',
    },
    {
      q: 'Can I merge PDF files on mobile devices (iPhone, iPad, Android)?',
      a: 'Yes. Our web app is fully responsive and optimized for mobile browsers like Safari, Chrome, Edge, and Firefox on iOS and Android. You can select PDFs directly from your phone’s Files app or storage.',
    },
    {
      q: 'What is the maximum file size I can process?',
      a: 'Because processing happens directly within your device’s local browser RAM rather than a remote cloud server, file size limits depend on your computer or phone’s available memory. Most modern devices comfortably process hundreds of megabytes without issues.',
    },
    {
      q: 'How do I contact support if I encounter a bug?',
      a: 'You can reach our engineering team directly via our Contact Page or by emailing hello@mergepdffilesfree.com.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="faq-top-ad" format="horizontal" />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <span>Home</span>
        <span>/</span>
        <span className="text-slate-600 font-medium">FAQ</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Help & Support
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Find quick answers to the most common questions regarding our tools, file safety, device compatibility, and privacy protocols.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 group"
              open={idx === 0}
            >
              <summary className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform text-lg">▾</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <AdPlaceholder slotId="faq-bottom-ad" format="horizontal" />
    </div>
  );
}
