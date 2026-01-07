'use client';

import { useI18nStore } from '@/lib/i18n/store';
import type { Locale } from '@/lib/i18n/config';

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18nStore();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1 px-2 font-normal h-8 min-h-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span className="hidden sm:inline uppercase">{locale}</span>
        <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-200 rounded-box w-40">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className={`flex items-center gap-2 ${locale === lang.code ? 'active' : ''}`}
              onClick={() => {
                setLocale(lang.code);
                // 关闭 dropdown
                const elem = document.activeElement as HTMLElement;
                if (elem) elem.blur();
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {locale === lang.code && <span className="ml-auto">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
