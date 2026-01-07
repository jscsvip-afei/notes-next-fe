'use client';

import React, { useEffect, useState } from 'react';
import { useNotesStore } from '@/lib/store';
import SidebarNoteListClient from './SidebarNoteListClient';

export default function SidebarNoteList() {
  const getAllNotes = useNotesStore((state) => state.getAllNotes);
  const notesState = useNotesStore((state) => state.notes);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col space-y-2 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-16 w-full"></div>
        ))}
      </div>
    );
  }

  const notes = getAllNotes().map((note) => ({
    id: note.id,
    title: note.title,
    content: note.content,
    date: note.updateTime
  }));

  return <SidebarNoteListClient notes={notes} />;
}
