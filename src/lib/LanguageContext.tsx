import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Lang = 'en' | 'zh';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: <T>(en: T, zh: T) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'wmsi-gp-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') return stored;
    } catch {
      /* ignore */
    }
    return 'en';
  });

  useEffect(() => {
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-zh', lang === 'zh');
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang: setLangState,
    toggle: () => setLangState(lang === 'en' ? 'zh' : 'en'),
    t: (en, zh) => (lang === 'zh' ? zh : en),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}

/**
 * Bilingual span: renders EN, ZH, or both depending on language.
 * Use for short strings inside components.
 */
export function Bi({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const { lang } = useLanguage();
  return <>{lang === 'zh' ? zh : en}</>;
}
