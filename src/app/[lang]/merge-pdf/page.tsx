import MergePdfLanguagePage, { generateStaticParams } from '../page';
import { constructPageMetadata } from '@/lib/metadata';

export { generateStaticParams };

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  return constructPageMetadata({ pageKey: 'merge-pdf', lang, path: 'merge-pdf' });
}

export default MergePdfLanguagePage;
