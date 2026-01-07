'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import SidebarNoteItem from './SidebarNoteItem';
import { useI18nStore } from '@/lib/i18n/store';

export default function SidebarNoteListClient({ notes }: { notes: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { dict } = useI18nStore();

  const q = searchParams.get('q');
  const filteredNotes = q 
    ? notes.filter(note => note.title.toLowerCase().includes(q.toLowerCase()))
    : notes;

  useEffect(() => {
    // 从 URL 路径中提取当前笔记 ID
    const match = pathname?.match(/\/note\/(\d+)/);
    if (match) {
      setSelectedId(match[1]);
    } else if (filteredNotes.length > 0 && !selectedId && pathname === '/') {
      // 如果在首页且有笔记，自动导航到第一条笔记
      router.push(`/note/${filteredNotes[0].id}`);
    }
  }, [filteredNotes, pathname, router, selectedId]);

  if (filteredNotes.length === 0 && !q) {
    return (
      <div className="flex flex-col items-center justify-center h-64 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>{dict.sidebar.noNotes}</p>
      </div>
    );
  }

  if (filteredNotes.length === 0 && q) {
    return (
      <div className="flex flex-col items-center justify-center h-64 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p>{dict.sidebar.noResults}</p>
      </div>
    );
  }

  const handleNoteClick = (id: string) => {
    setSelectedId(id);
    router.push(`/note/${id}`);
  };

  return (
    <div className="flex flex-col space-y-2 mt-4">
      {filteredNotes.map((note) => (
        <SidebarNoteItem 
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          date={dayjs(note.date).format('YYYY/M/D')}
          isActive={selectedId === note.id}
          onClick={() => handleNoteClick(note.id)}
        />
      ))}
    </div>
  );
}
