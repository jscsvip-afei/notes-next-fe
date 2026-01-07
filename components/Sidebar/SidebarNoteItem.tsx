'use client';

import React, { useState } from 'react';

interface SidebarNoteItemProps {
  id: string;
  title: string;
  content: string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SidebarNoteItem({ id, title, content, date, isActive, onClick }: SidebarNoteItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`card bg-base-100 shadow-sm hover:bg-base-200 cursor-pointer transition-colors border p-4 mb-2 ${isActive ? 'border-primary bg-base-200' : 'border-base-200'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate">{title}</h3>
          <div className="text-xs text-base-content/50 mt-1">{date}</div>
        </div>
        <button 
          className="btn btn-circle btn-xs btn-ghost ml-2 shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsExpanded(prev => !prev);
          }}
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="text-sm opacity-70 truncate">
          {content}
        </div>
      )}
    </div>
  );
}
