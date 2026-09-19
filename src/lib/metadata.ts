import type { Metadata } from 'next';
import { supportedLanguages } from './constants';

const BASE_URL = 'https://mergepdffilesfree.com';

interface PageMetadataOptions {
  pageKey: string;
  lang?: string;
  path?: string; // e.g. "split-pdf", "compress-pdf" or "" for home
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackKeywords?: string[];
}

export function constructPageMetadata({
  pageKey,
  lang = 'en',
  path = '',
  fallbackTitle,
  fallbackDescription,
  fallbackKeywords,
}: PageMetadataOptions): Metadata {
  let langData: any = null;
  try {
    langData = require(`@/data/i18n/${lang}.json`);
  } catch (e) {
    langData = require('@/data/i18n/en.json');
  }

  const pageData = langData?.pages?.[pageKey] || {};

  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const isHome = !cleanPath;

  const canonicalPath = isHome
    ? lang === 'en'
      ? `${BASE_URL}/`
      : `${BASE_URL}/${lang}/`
    : lang === 'en'
    ? `${BASE_URL}/${cleanPath}/`
    : `${BASE_URL}/${lang}/${cleanPath}/`;

  const alternateLanguages: Record<string, string> = {
    'x-default': isHome ? `${BASE_URL}/` : `${BASE_URL}/${cleanPath}/`,
  };

  supportedLanguages.forEach((l) => {
    alternateLanguages[l.code] = isHome
      ? l.code === 'en'
        ? `${BASE_URL}/`
        : `${BASE_URL}/${l.code}/`
      : l.code === 'en'
      ? `${BASE_URL}/${cleanPath}/`
      : `${BASE_URL}/${l.code}/${cleanPath}/`;
  });

  const title = pageData.title || fallbackTitle || 'Merge PDF Files Free Online - 100% Private In-Browser';
  const description =
    pageData.description ||
    fallbackDescription ||
    'Free client-side PDF tools. Merge, split, compress, and convert PDF documents in your browser with zero server uploads and 100% confidentiality.';

  const keywordsString = pageData.keywords || '';
  const keywords = keywordsString
    ? keywordsString.split(',').map((k: string) => k.trim())
    : fallbackKeywords || ['merge pdf', 'split pdf', 'compress pdf', 'jpg to pdf', 'free pdf tools'];

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: 'MergePDFFilesFree',
      images: [
        {
          url: `${BASE_URL}/images/og-images.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/images/og-images.png`],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
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
