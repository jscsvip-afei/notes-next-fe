'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateNote } from '@/app/actions';
import { useNotesStore } from '@/lib/store';
import { useI18nStore } from '@/lib/i18n/store';
import NotePreview from '@/components/Note/NotePreview';

interface NoteEditorProps {
  noteId: string | null;
  initialTitle: string;
  initialContent: string;
  onSave?: () => void;
}

export default function NoteEditor({ noteId, initialTitle, initialContent, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string[]; content?: string[] }>({});
  
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const deleteNoteFromStore = useNotesStore((state) => state.deleteNote);
  const { dict } = useI18nStore();

  const handleSave = async () => {
    setIsSaving(true);
    setErrors({});
    
    const result = validateNote(title, content);

    if (!result.success) {
      setErrors(result.errors || {});
      setIsSaving(false);
      return;
    }

    if (noteId) {
      updateNote(noteId, title, content);
      router.push(`/note/${noteId}`);
    } else {
      const newId = addNote(title, content);
      router.push(`/note/${newId}`);
    }
    
    setIsSaving(false);

    if (onSave) {
      onSave();
    }
  };

  const handleDelete = async () => {
    if (!noteId) return;
    if (confirm(dict.note.deleteConfirm)) {
      setIsDeleting(true);
      deleteNoteFromStore(noteId);
      router.push('/');
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-1/2 h-full gap-4 p-4 border-r border-base-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 flex-1 mr-4">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={dict.note.titlePlaceholder}
              className={`input input-bordered w-full text-xl font-bold ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && <span className="text-error text-sm">{errors.title[0]}</span>}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="btn btn-primary"
            >
              {isSaving ? dict.note.saving : dict.note.done}
            </button>
            {noteId && (
              <button 
                onClick={handleDelete}
                disabled={isSaving || isDeleting}
                className="btn btn-outline btn-error"
              >
                {isDeleting ? dict.note.deleting : dict.common.delete}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`textarea textarea-bordered w-full flex-1 text-base resize-none ${errors.content ? 'textarea-error' : ''}`}
            placeholder={dict.note.contentPlaceholder}
          ></textarea>
          {errors.content && <span className="text-error text-sm">{errors.content[0]}</span>}
        </div>
      </div>
      <div className="w-1/2 h-full bg-base-100">
        <NotePreview 
          title={title} 
          content={content} 
          updateTime={new Date().toISOString()} 
        />
      </div>
    </div>
  );
}
