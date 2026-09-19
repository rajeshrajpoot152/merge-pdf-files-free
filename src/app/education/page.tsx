import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EducationPage from '@/app/[lang]/education/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'education', lang: 'en', path: 'education' });
}

export default async function RootEducationPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <EducationPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
