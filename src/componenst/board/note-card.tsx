import type { NoteCardTypes } from "@/types/board/note-card-types";

export function NoteCard({ note, isOptimistic = false }: NoteCardTypes) {
  return (
    <div
      style={{ background: note.color }}
      className={`
        relative w-48 min-h-44 rounded-sm shadow-md p-4 flex flex-col gap-3
        ${isOptimistic ? 'opacity-50 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400 shadow-inner"/>

      <p className="text-sm text-gray-800 mt-2 flex-1 wrap-break-words">
        {note.content}
      </p>

      <div className="mt-auto">
        <span className="text-xs text-gray-400">
          {note.created_at ? new Date(note.created_at).toLocaleDateString() : '...'}
        </span>
      </div>
    </div>
  )
}