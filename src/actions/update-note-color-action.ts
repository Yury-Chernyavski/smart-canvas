"use server"

import { routes } from "@/lib/routes"
import { updateNote } from "@/services/notes"
import { NotesDTO } from "@/types/notes"
import { revalidatePath } from "next/cache"

export type UpdateNoteColorState =
	| { status: "idle" }
	| { status: "success"; data: NotesDTO }
	| { status: "error"; message: string }

export async function updateNoteColorAction(
	prevState: UpdateNoteColorState,
	formData: FormData,
): Promise<UpdateNoteColorState> {
	const id = formData.get("id")?.toString()
	const color = formData.get("color")?.toString()

	if (!id) return { status: "error", message: "Note id is required" }
	if (!color) return { status: "error", message: "Color is required" }
	

	try {
		await new Promise(res => setTimeout(res, 5000))
		const data = await updateNote(id, { color })
		revalidatePath(routes.board)
		return { status: "success", data }
	} catch {
		return { status: "error", message: "Failed to update note color" }
	}
}
