import React from 'react';

export default function SidebarNoteListSkeleton() {
  return (
    <div className="flex flex-col space-y-2 mt-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card bg-base-100 shadow-sm border border-base-200 p-4 mb-2">
          <div className="h-6 w-3/4 skeleton mb-2"></div>
          <div className="h-4 w-full skeleton mb-2"></div>
          <div className="h-3 w-1/3 skeleton"></div>
        </div>
      ))}
    </div>
  );
}
