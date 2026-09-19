import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqPage from '@/app/[lang]/faq/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'faq', lang: 'en', path: 'faq' });
}

export default function RootFaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <FaqPage />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
