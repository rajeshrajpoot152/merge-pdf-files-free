import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TermsOfServicePage from '@/app/[lang]/terms-of-service/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'terms-of-service', lang: 'en', path: 'terms-of-service' });
}

export default async function RootTermsOfServicePage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <TermsOfServicePage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
