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
  return constructPageMetadata({ pageKey: 'education', lang, path: 'education' });
}

export default async function EducationPage({ params }: PageProps) {
  const { lang } = await params;
  const getUrl = (path: string) => (lang === 'en' ? `/${path}/` : `/${lang}/${path}/`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <AdPlaceholder slotId="edu-top-ad" format="horizontal" />

      <nav className="mb-6 flex items-center space-x-1.5 text-xs text-slate-400">
        <Link href={getUrl('')} className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Education Solutions</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-12">
        <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Academic & Educational Tools
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
          Free, Fast PDF Utilities for Students and Educators
        </h1>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <p>
            Students and teachers shouldn’t have to pay expensive monthly software subscriptions just to combine assignment sheets or compress a research paper for portal submission. <strong>MergePDFFilesFree.com</strong> is proudly 100% free for educational use worldwide.
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">How Students &amp; Educators Use Our Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <span className="text-2xl">📚</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1.5">Homework &amp; Assignment Submissions</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Take pictures of handwritten homework notes or whiteboard diagrams, convert them with{' '}
                <Link href={getUrl('jpg-to-pdf')} className="text-blue-600 font-semibold underline">
                  JPG to PDF
                </Link>
                , and merge them into a single clean PDF for Canvas, Blackboard, or Google Classroom.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <span className="text-2xl">🎓</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1.5">Dissertation &amp; Thesis Compilations</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Combine cover pages, abstract, literature review chapters, charts, and bibliography into one seamlessly bound dissertation ready for university submission.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <span className="text-2xl">🔬</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1.5">Academic Journal Submissions</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Many peer-reviewed journals enforce strict 5 MB or 10 MB limits. Use our{' '}
                <Link href={getUrl('compress-pdf')} className="text-blue-600 font-semibold underline">
                  Compress PDF Tool
                </Link>{' '}
                to shrink heavy scientific figures while keeping graphs perfectly legible.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <span className="text-2xl">🏫</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1.5">Classroom Handouts &amp; Syllabus Prep</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Educators can easily extract specific readings from bulky textbooks using our{' '}
                <Link href={getUrl('split-pdf')} className="text-blue-600 font-semibold underline">
                  Split PDF Tool
                </Link>{' '}
                to distribute tailored reading packets to students.
              </p>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-3">Safe for School &amp; University Networks</h2>
          <p>
            Because MergePDFFilesFree does not require user accounts, email registration, or software installations, school IT administrators can safely recommend our tools across Chromebooks, iPads, MacBooks, and Windows PCs.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="edu-bottom-ad" format="horizontal" />
    </div>
  );
}
