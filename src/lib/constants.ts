export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'zh', name: '简体中文', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'it', name: 'Italiano', dir: 'ltr' },
];

export const staticLangParams = supportedLanguages.map((l) => ({ lang: l.code }));
