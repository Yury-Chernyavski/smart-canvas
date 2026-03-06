'use client'

import type { RemoveNoteButton as RemoveNoteButtonType } from "@/types/card/remove-note-button.type";
import { removeNoteAction } from "@/actions/remove-note-action";
import { FC, useActionState } from "react";

export const RemoveNoteButton: FC<RemoveNoteButtonType> = ({ noteId }) => {
  const [_, action] = useActionState(removeNoteAction, {status: 'idle'});

  return (
    <form action={action}>
      <input type="hidden" name="id" value={noteId}/>
      <button
        type="submit"
        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
      >
        ✕
      </button>
    </form>
  )
}