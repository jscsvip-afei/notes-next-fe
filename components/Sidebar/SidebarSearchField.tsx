'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useI18nStore } from '@/lib/i18n/store';

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { dict } = useI18nStore();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label hidden">
        <span className="label-text">Search</span>
      </label>
      <input 
        type="text" 
        placeholder={dict.sidebar.search} 
        className="input input-bordered w-full"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('q') || ''}
      />
    </div>
  );
}
