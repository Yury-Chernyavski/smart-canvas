import { z } from "zod"

export const createNoteSchema = z.object({
	content: z
		.string()
		.min(1, "To write something")
		.max(500, "Too many characters, max 500 characters"),
	color: z.string().optional(),
	position_x: z.coerce.number().default(0),
	position_y: z.coerce.number().default(0),
})

export type CreateNotesDTO = z.infer<typeof createNoteSchema>
