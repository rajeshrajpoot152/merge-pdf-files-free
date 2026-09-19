import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JpgToPdfPage from '@/app/[lang]/jpg-to-pdf/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'jpg-to-pdf', lang: 'en', path: 'jpg-to-pdf' });
}

export default async function RootJpgToPdfPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <JpgToPdfPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
