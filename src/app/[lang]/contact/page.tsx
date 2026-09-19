import React from 'react';
import AdPlaceholder from '@/components/AdPlaceholder';
import ContactForm from '@/components/ContactForm';
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
  return constructPageMetadata({ pageKey: 'contact', lang, path: 'contact' });
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="contact-top-ad" format="horizontal" />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <span>Home</span>
        <span>/</span>
        <span className="text-slate-600 font-medium">Contact Us</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Direct Info */}
        <div className="md:col-span-1 space-y-6">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Support Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              We’re Here to Help
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Have a bug to report, a feature request, or an inquiry regarding our client-side tools? Reach out anytime.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4 text-xs">
            <div className="flex items-start space-x-3">
              <span className="text-lg">✉️</span>
              <div>
                <strong className="text-slate-900 block font-semibold">Direct Email:</strong>
                <a href="mailto:hello@mergepdffilesfree.com" className="text-blue-600 hover:underline">
                  hello@mergepdffilesfree.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-lg">⏱️</span>
              <div>
                <strong className="text-slate-900 block font-semibold">Response Time:</strong>
                <span className="text-slate-600">Within 24 business hours</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-lg">🛡️</span>
              <div>
                <strong className="text-slate-900 block font-semibold">Security &amp; Privacy:</strong>
                <span className="text-slate-600">Never attach confidential PDFs to support emails.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>

      <AdPlaceholder slotId="contact-bottom-ad" format="horizontal" />
    </div>
  );
}
