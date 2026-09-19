import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TermsPage from '@/app/[lang]/terms/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'terms-of-service', lang: 'en', path: 'terms' });
}

export default function RootTermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <TermsPage />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
