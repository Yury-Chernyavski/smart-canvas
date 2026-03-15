'use client'

import { removeNoteAction } from "@/actions/remove-note-action";
import { useBoardContext } from "@/context/board-context";
import type { RemoveNoteButton as RemoveNoteButtonType } from "@/types/card/remove-note-button-types";
import { FC, useActionState } from "react";

export const RemoveNoteButton: FC<RemoveNoteButtonType> = ({ noteId }) => {
  const { handleRemoveAction } = useBoardContext();
  const [_, action] = useActionState(removeNoteAction, { status: 'idle' });
  
  const handleSubmit = (formData: FormData) => {
    handleRemoveAction(noteId);
    action(formData);
  }

  return (
		<form action={handleSubmit}>
			<input
				type="hidden"
				name="id"
				value={noteId}
			/>
			<button
				type="submit"
				className="text-xs text-gray-400 hover:text-red-500 transition-colors">
				✕
			</button>
		</form>
	)
}
