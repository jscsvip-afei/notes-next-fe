'use client';

import { useI18nStore } from '@/lib/i18n/store';

export default function EmptyState() {
  const { dict } = useI18nStore();

  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <div className="text-center opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-xl font-medium mb-1">{dict.empty.title}</h2>
        <p className="text-sm">{dict.empty.description}</p>
      </div>
    </div>
  );
}
