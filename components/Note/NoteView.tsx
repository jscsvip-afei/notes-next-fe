'use client';

import Link from 'next/link';
import NotePreview from './NotePreview';
import { useI18nStore } from '@/lib/i18n/store';

interface NoteViewProps {
  noteId: string;
  initialTitle: string;
  initialContent: string;
  initialUpdateTime: string;
}

export default function NoteView({ noteId, initialTitle, initialContent, initialUpdateTime }: NoteViewProps) {
  const { dict } = useI18nStore();

  return (
    <div className="h-full relative bg-base-100">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Link 
          href={`/note/edit/${noteId}`}
          className="btn btn-primary"
        >
          {dict.common.edit}
        </Link>
      </div>
      <NotePreview 
        title={initialTitle} 
        content={initialContent} 
        updateTime={initialUpdateTime} 
      />
    </div>
  );
}
