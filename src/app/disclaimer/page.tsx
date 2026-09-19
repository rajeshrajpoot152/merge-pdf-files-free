import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerPage from '@/app/[lang]/disclaimer/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'disclaimer', lang: 'en', path: 'disclaimer' });
}

export default async function RootDisclaimerPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <DisclaimerPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
