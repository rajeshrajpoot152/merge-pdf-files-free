import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecurityPage from '@/app/[lang]/security/page';
import { constructPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return constructPageMetadata({ pageKey: 'security', lang: 'en', path: 'security' });
}

export default async function RootSecurityPage() {
  const params = Promise.resolve({ lang: 'en' });
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <SecurityPage params={params} />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
