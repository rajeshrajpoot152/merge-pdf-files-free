import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supportedLanguages, staticLangParams } from '@/lib/constants';

export async function generateStaticParams() {
  return staticLangParams;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = 'https://mergepdffilesfree.com';
  const canonicalPath = lang === 'en' ? `${baseUrl}/` : `${baseUrl}/${lang}/`;

  const alternateLanguages: Record<string, string> = {
    'x-default': `${baseUrl}/`,
  };
  supportedLanguages.forEach((l) => {
    alternateLanguages[l.code] = l.code === 'en' ? `${baseUrl}/` : `${baseUrl}/${l.code}/`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title: 'Merge PDF Files Free Online - Combine, Split & Edit PDFs (100% Secure)',
    description: 'Merge multiple PDF files into one document online for free. 100% private, zero server uploads, no watermarks, and no file limits.',
    keywords: [
      'pdf merge', 'merge pdf', 'combine pdf', 'combine pdf files', 'merge pdf documents',
      'pdf joiner', 'concatenate pdf files', 'split pdf online', 'merge jpg to pdf', 'compress pdf'
    ],
    alternates: {
      canonical: canonicalPath,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Merge PDF Files Free Online | 100% Secure & Unlimited In-Browser',
      description: 'Merge multiple PDF files into one single document online for free. 100% private, zero server uploads, and no watermarks.',
      url: canonicalPath,
      siteName: 'MergePDFFilesFree',
      images: [
        {
          url: `${baseUrl}/images/og-images.png`,
          width: 1200,
          height: 630,
          alt: 'MergePDFFilesFree Tool',
        },
      ],
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLangObj = supportedLanguages.find((l) => l.code === lang) || supportedLanguages[0];
  const isRtl = currentLangObj.dir === 'rtl';

  return (
    <div lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col min-h-screen">
      <Header currentLang={lang} />
      <main className="flex-1 w-full">{children}</main>
      <Footer currentLang={lang} />
    </div>
  );
}
