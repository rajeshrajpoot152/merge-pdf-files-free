import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdfPage from '@/app/[lang]/compress-pdf/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'compress-pdf', lang: 'en', path: 'compress-pdf' });
}

export default async function RootCompressPdfPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <CompressPdfPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
