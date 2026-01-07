'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import SidebarSearchField from './SidebarSearchField';
import SidebarNoteList from './SidebarNoteList';
import SidebarNoteListSkeleton from './SidebarNoteListSkeleton';
import { useI18nStore } from '@/lib/i18n/store';

export default function Sidebar() {
  const { dict } = useI18nStore();

  return (
    <div className="w-80 h-full bg-base-200 p-4 flex flex-col border-r border-base-300">
      <div className="flex gap-2 mb-4">
        <SidebarSearchField />
        <Link href="/note/edit" className="btn btn-primary">{dict.header.newNote}</Link>
      </div>
      <div className="overflow-y-auto flex-1">
        <Suspense fallback={<SidebarNoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </div>
    </div>
  );
}
