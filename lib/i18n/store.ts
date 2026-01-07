import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from './config';
import zhDict from './dictionaries/zh.json';
import enDict from './dictionaries/en.json';

export type Dictionary = typeof zhDict;

const dictionaries: Record<Locale, Dictionary> = {
  zh: zhDict,
  en: enDict,
};

interface I18nState {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: 'zh',
      dict: zhDict,
      setLocale: (locale: Locale) => {
        set({
          locale,
          dict: dictionaries[locale],
        });
      },
    }),
    {
      name: 'i18n-storage',
      onRehydrateStorage: () => (state) => {
        // 确保恢复后字典与语言匹配
        if (state) {
          state.dict = dictionaries[state.locale];
        }
      },
    }
  )
);
