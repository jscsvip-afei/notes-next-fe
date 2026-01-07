import React from 'react';
import { marked } from 'marked';
import dayjs from 'dayjs';

interface NotePreviewProps {
  title: string;
  content: string;
  updateTime: string;
}

export default function NotePreview({ title, content, updateTime }: NotePreviewProps) {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <div className="text-sm text-base-content/50 mb-6">
        最后更新: {dayjs(updateTime).format('YYYY-MM-DD HH:mm')}
      </div>
      <div 
        className="prose max-w-none note-preview break-words"
        dangerouslySetInnerHTML={{
          __html: marked.parse(content || '')
        }}
      />
    </div>
  );
}
