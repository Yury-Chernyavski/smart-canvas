"use client"

import { removeNoteAction } from "@/actions/remove-note-action"
import { useBoardContext } from "@/context/board-context"
import type { RemoveNoteButton as RemoveNoteButtonType } from "@/types/card/remove-note-button-types"
import { FC, startTransition } from "react"

export const RemoveNoteButton: FC<RemoveNoteButtonType> = ({ noteId }) => {
	const { handleRemoveAction } = useBoardContext()

	const handleSubmit = async () => {
		startTransition(async () => {
			handleRemoveAction(noteId)
			await removeNoteAction(noteId)
		})
	}

	return (
		<button
			onClick={handleSubmit}
			className="text-xs text-gray-400 hover:text-red-500 transition-colors">
			✕
		</button>
	)
}
