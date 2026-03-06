'use server'

import { removeNote } from "@/services/notes";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";

export type RemoveNoteAction =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error', message: string };

export async function removeNoteAction(
  prevState: RemoveNoteAction,
  formData: FormData,
): Promise<RemoveNoteAction> {
  const id = formData.get('id')?.toString();
  
  if (!id) {
    return {status: 'error', message: 'Note id is required'}
  }

  await removeNote(id);

  //TODO: read more about revalidatePath()
  revalidatePath(routes.board);

  return {status: 'success'}
}