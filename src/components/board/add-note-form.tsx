"use client"

import { SubmitButton } from "@/components/card/submit-button"
import { ColorPalette } from "@/components/board/color-palette"
import { useBoardContext } from "@/context/board-context"
import { FC, useState } from "react"
import { OPTIMISTIC_NOTE } from "@/constants/optimistic-note"
import { Button } from "@/components/ui/button"

export const AddNoteForm: FC = () => {
	const { newNote, handleAddAction } = useBoardContext()
	const [selectedColor, setSelectedColor] = useState<string>(OPTIMISTIC_NOTE.color)
	const [showPalette, setShowPalette] = useState(false)

	return (
		<form action={handleAddAction}>
			<textarea
				name="content"
				placeholder="Write a note..."
				rows={4}
				style={{
					backgroundColor: selectedColor,
				}}
				className="placeholder:text-black text-black"
			/>

			<input
				type="hidden"
				value={selectedColor}
				name="color"
			/>

			<div className="mt-3 flex items-center gap-2">
				<Button
					type="button"
					onClick={() => setShowPalette(!showPalette)}
					title="Choose color"
					className="px-3 py-2  rounded transition-all text-sm">
					🎨
				</Button>
			</div>

			{showPalette && (
				<ColorPalette
					selected={selectedColor}
					onChange={setSelectedColor}
				/>
			)}

			{newNote.status === "error" && "fields" in newNote && newNote.fields?.content && (
				<p>{newNote.fields.content}</p>
			)}

			{newNote.status === "error" && !("fields" in newNote) && <p>{newNote.message}</p>}

			{newNote.status === "success" && <p>Note is added!</p>}

			<SubmitButton variant="primary" />
		</form>
	)
}
