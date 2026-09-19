import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPage from '@/app/[lang]/contact/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'contact', lang: 'en', path: 'contact' });
}

export default function RootContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <ContactPage />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
