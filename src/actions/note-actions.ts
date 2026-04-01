'use server'

import type { NotesDTO } from "@/types/notes";
import { createNote } from "@/services/notes";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { after } from "next/server";
import { createNoteSchema } from "@/lib/validations/note-schema";
import { z } from "zod";

export type NoteActionState =
  | {status: 'idle'}
  | {status: 'success', data: NotesDTO}
  | {status: 'error', message: string, fields?: Record<string, string>};

export async function createNoteAction(
  prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {

  // await new Promise(resolve => setTimeout(resolve, 3000));
  const rawData = Object.fromEntries(formData);

  const parseNote = createNoteSchema.safeParse(rawData);

  if (!parseNote.success) {
    const { fieldErrors } = z.flattenError(parseNote.error)
    console.log("fieldErrors:", fieldErrors);

    return {
      status: "error",
      message: `The validation error occurred while creating the note`,
      fields: {
        content: fieldErrors.content?.[0] ?? '',
        color: fieldErrors.color?.[0] ?? '',
      }
    }
  }

  try {
    const data = await createNote(parseNote.data);

    after(async () => {
      await new Promise(res => setTimeout(res, 3000));
      console.log(`[LOG]: Note created: ${data.id} at ${data.created_at}`);
    })
  
    revalidatePath(routes.board);
    return { status: 'success', data };
  } catch {
    return {status: 'error', 'message': 'Failed to create note'}
  }
}
