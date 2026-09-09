import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import { Container } from './primitives';

const NAV_LINKS = [
  { to: '/', en: 'Home', zh: '首页', end: true },
  { to: '/perspectives', en: 'Perspectives', zh: '观点' },
  { to: '/statements', en: 'Statements', zh: '陈述类型' },
  { to: '/statements/mindmap', en: 'Mindmap', zh: '思维导图' },
  { to: '/teachers/statements', en: 'Teachers', zh: '教师面板' },
];

export function SiteLayout() {
  const { lang, toggle } = useLanguage();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <SiteHeader scrolled={scrolled} lang={lang} toggleLang={toggle} />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader({
  scrolled,
  lang,
  toggleLang,
}: {
  scrolled: boolean;
  lang: 'en' | 'zh';
  toggleLang: () => void;
}) {
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'bg-[color:var(--color-paper)]/90 border-b border-[color:var(--color-line)]'
          : 'bg-[color:var(--color-paper)]/60 border-b border-transparent'
      }`}
    >
      <Container size="wide">
        <div
          className={`flex items-center justify-between gap-6 transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-4 md:py-5'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <WMSIMark />
            <div className="hidden sm:block">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] leading-tight">
                WMSI · Ipoh
              </p>
              <p className="font-display text-[15px] leading-tight text-[color:var(--color-ink)]">
                Global Perspectives
                <span className="font-mono text-[10.5px] ml-1.5 text-[color:var(--color-ink-3)]">0457</span>
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-[13.5px] font-semibold px-3.5 py-2 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[color:var(--color-ink)] text-[color:var(--color-paper)]'
                      : 'text-[color:var(--color-ink-2)] hover:text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper-2)]'
                  }`
                }
              >
                {lang === 'zh' ? l.zh : l.en}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="font-mono text-[12px] font-semibold px-3.5 py-2 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)] transition-colors"
              aria-label={lang === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>

            <MobileMenu lang={lang} />
          </div>
        </div>
      </Container>
    </header>
  );
}

function MobileMenu({ lang }: { lang: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink)]"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
          <rect y="0" width="18" height="2" fill="currentColor" />
          <rect y="6" width="18" height="2" fill="currentColor" />
          <rect y="12" width="18" height="2" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[color:var(--color-ink)]/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-[color:var(--color-paper)] border-l border-[color:var(--color-line)] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-line)]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)]">
                Menu
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-[color:var(--color-paper-2)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `font-display text-[19px] px-4 py-3 rounded-md ${
                      isActive
                        ? 'bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]'
                        : 'text-[color:var(--color-ink-2)]'
                    }`
                  }
                >
                  {lang === 'zh' ? l.zh : l.en}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function SiteFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="mt-24 border-t border-[color:var(--color-line)] py-12 bg-[color:var(--color-paper-2)]">
      <Container size="wide">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <WMSIMark />
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-ink-3)]">
                  Wesley Methodist School International · Ipoh
                </p>
                <p className="font-display text-[16px] text-[color:var(--color-ink)] mt-0.5">
                  IGCSE Global Perspectives 0457
                </p>
              </div>
            </div>
            <p className="text-[13.5px] text-[color:var(--color-ink-2)] max-w-[52ch] leading-relaxed">
              {lang === 'zh'
                ? '面向 Y10 学生与教师的自学与教学资源。所有内容以剑桥考试大纲和牛津教材第三版为依据。'
                : 'Self-study and teaching resources for Y10 students and staff. All content aligned to the Cambridge 0457 syllabus and the Oxford Global Perspectives 3rd edition textbook.'}
            </p>
          </div>
          <div className="text-[12px] font-mono text-[color:var(--color-ink-3)] md:text-right">
            <p>Y10 · Term 1 · 2026 – 2027</p>
            <p className="mt-1">
              {lang === 'zh' ? '最后更新' : 'Last updated'} · {new Date().toISOString().slice(0, 7)}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function WMSIMark() {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-[color:var(--color-ink)] flex items-center justify-center bg-[color:var(--color-paper)] shrink-0">
      <span className="font-display text-[16px] leading-none text-[color:var(--color-ink)]">W</span>
    </div>
  );
}
