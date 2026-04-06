"use client"

import { ColorPalette } from "@/components/board/color-palette"
import { RemoveNoteButton } from "@/components/card/remove-note-button"
import { useBoardContext } from "@/context/board-context"
import type { NoteCardType } from "@/types/board/note-card-types"
import { useState } from "react"

export function NoteCard({ note, isOptimistic = false }: NoteCardType) {
	const { handleColorAction } = useBoardContext()
	const [showColorPalette, setShowColorPalette] = useState(false)

	const handleChangeColor = (color: string) => {
		const formData = new FormData()
		formData.append("id", note.id)
		formData.append("color", color)
		handleColorAction(formData)
		setShowColorPalette(false)
	}

	return (
		<div
			style={{ background: note.color }}
			className={`
        relative w-48 min-h-44 rounded-sm shadow-md p-4 flex flex-col gap-3
        ${isOptimistic ? "opacity-50 pointer-events-none" : "opacity-100"}
				`}>
			<div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />

			<p className="text-sm text-gray-800 mt-2 flex-1 wrap-break-words">{note.content}</p>

			<div className="mt-auto space-y-2">
				<div className="flex justify-between items-center">
					<span className="text-xs text-gray-400">
						{note.created_at ? new Date(note.created_at).toLocaleDateString("en-US") : "..."}
					</span>
					<button
						onClick={() => setShowColorPalette(!showColorPalette)}
						className="text-xs px-2 py-1 rounded bg-green-700 hover:bg-green-800 transition-colors"
						title="Change color">
						🎨
					</button>
				</div>

				{showColorPalette && (
					<ColorPalette
						selected={note.color}
						onChange={handleChangeColor}
					/>
				)}
			</div>
			<RemoveNoteButton noteId={note.id} />
		</div>
	)
}
