'use server'

import type { CreateNotesDTO, NotesDTO } from "@/types/notes";
import { createNote } from "@/services/notes";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { after } from "next/server";

export type NoteActionState =
  | {status: 'idle'}
  | {status: 'success', data: NotesDTO}
  | {status: 'error', message: string};

export async function createNoteAction(
  prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {

  // await new Promise(resolve => setTimeout(resolve, 3000));
  const rawData = Object.fromEntries(formData);

  const input: CreateNotesDTO = {
    content: rawData.content?.toString().trim(),
    color: rawData.color?.toString(),
    position_x: Number(rawData.position_x) || 0,
    position_y: Number(rawData.position_y) || 0,
  }

  if (!input.content) {
    return { status: 'error', message: 'To write something' }

  }
  if (input.content.length > 500) {
    return { status: 'error', message: 'Too many characters' };
  }

  const data = await createNote(input);

  after(async () => {
    await new Promise(res => setTimeout(res, 3000));
    console.log(`[LOG]: Note created: ${data.id} at ${data.created_at}`);
  })

  revalidatePath(routes.board);

  return { status: 'success', data };
}