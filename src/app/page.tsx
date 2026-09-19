import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MergePdfLanguagePage from '@/app/[lang]/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'index', lang: 'en', path: '' });
}

export default async function RootPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <MergePdfLanguagePage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
