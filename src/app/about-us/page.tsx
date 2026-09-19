import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutUsPage from '@/app/[lang]/about-us/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'about-us', lang: 'en', path: 'about-us' });
}

export default function RootAboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <AboutUsPage />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
