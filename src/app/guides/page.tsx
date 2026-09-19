import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesPage from '@/app/[lang]/guides/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'guides', lang: 'en', path: 'guides' });
}

export default async function RootGuidesPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <GuidesPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
