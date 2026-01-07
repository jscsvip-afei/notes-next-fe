'use client';

import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18nStore } from '@/lib/i18n/store';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"
];

export default function Header() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const { dict } = useI18nStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(e.target.value);
    // Close dropdown on selection
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">📚{mounted ? dict.header.title : 'Next云笔记'}</a>
      </div>
      <div className="flex-none gap-1">
        <LanguageSwitcher />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1 px-2 font-normal h-8 min-h-8">
            <span className="text-base leading-none">🎨</span>
            <span className="hidden sm:inline capitalize leading-none">{mounted ? currentTheme : 'Theme'}</span>
            <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto flex-nowrap">
            <li className="menu-title">
              <span>Theme</span>
            </li>
            {themes.map((theme) => (
              <li key={theme}>
                <label className="flex justify-between items-center cursor-pointer gap-2">
                  <span 
                    className="w-4 h-4 rounded shrink-0" 
                    data-theme={theme} 
                    style={{ background: 'linear-gradient(135deg, oklch(var(--p)) 50%, oklch(var(--s)) 50%)' }}
                  ></span>
                  <span className="capitalize flex-1">{theme}</span>
                  {mounted && currentTheme === theme && (
                    <span className="ml-auto">✓</span>
                  )}
                  <input 
                    type="radio" 
                    name="theme-dropdown" 
                    className="theme-controller hidden" 
                    value={theme} 
                    onChange={handleThemeChange}
                    checked={currentTheme === theme}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
