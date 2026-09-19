import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessPage from '@/app/[lang]/business/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'business', lang: 'en', path: 'business' });
}

export default async function RootBusinessPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <BusinessPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
