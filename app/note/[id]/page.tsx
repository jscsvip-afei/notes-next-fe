'use client';

import { use, useEffect, useState } from 'react';
import { useNotesStore } from '@/lib/store';
import { useI18nStore } from '@/lib/i18n/store';
import NoteView from '@/components/Note/NoteView';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 笔记详情骨架屏
function NoteDetailSkeleton() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="skeleton h-12 w-3/4 mb-4"></div>
      <div className="skeleton h-4 w-32 mb-6"></div>
      <div className="space-y-3">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-4/5"></div>
      </div>
    </div>
  );
}

export default function NotePage({ params }: PageProps) {
  const { id } = use(params);
  const getNote = useNotesStore((state) => state.getNote);
  const [mounted, setMounted] = useState(false);
  const { dict } = useI18nStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <NoteDetailSkeleton />;
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

  return (
    <NoteView 
      noteId={id}
      initialTitle={note.title}
      initialContent={note.content}
      initialUpdateTime={note.updateTime}
    />
  );
}
