import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyPolicyPage from '@/app/[lang]/privacy-policy/page';

export default function RootPrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentLang="en" />
      <main className="flex-1 w-full">
        <PrivacyPolicyPage />
      </main>
      <Footer currentLang="en" />
    </div>
  );
}
