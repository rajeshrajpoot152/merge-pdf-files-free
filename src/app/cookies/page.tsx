import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookiesPage from '@/app/[lang]/cookies/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'cookies', lang: 'en', path: 'cookies' });
}

export default async function RootCookiesPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <CookiesPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
