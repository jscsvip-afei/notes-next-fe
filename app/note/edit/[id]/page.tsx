'use client';

import { use, useEffect, useState } from 'react';
import NoteEditor from '@/components/Note/NoteEditor';
import { useNotesStore } from '@/lib/store';
import { useI18nStore } from '@/lib/i18n/store';

export default function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const getNote = useNotesStore((state) => state.getNote);
  const [mounted, setMounted] = useState(false);
  const { dict } = useI18nStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-8 h-full overflow-y-auto">
        <div className="skeleton h-12 w-3/4 mb-4"></div>
        <div className="skeleton h-4 w-32 mb-6"></div>
        <div className="space-y-3">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-2/3"></div>
        </div>
      </div>
    );
  }

  const note = getNote(id);
  
  if (!note) {
    return (
      <div className="p-8 h-full overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-base-content/70 mb-2">{dict.note.notFound}</h2>
          <p className="text-base-content/50">{dict.note.notFoundDesc.replace('{id}', id)}</p>
        </div>
      </div>
    );
  }

  return <NoteEditor noteId={id} initialTitle={note.title} initialContent={note.content} />
}
