import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitPdfPage from '@/app/[lang]/split-pdf/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'split-pdf', lang: 'en', path: 'split-pdf' });
}

export default async function RootSplitPdfPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <SplitPdfPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
