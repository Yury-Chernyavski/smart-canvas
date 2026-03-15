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
  // await new Promise(res => setTimeout(res, 3000))
  const id = formData.get('id')?.toString();
  
  if (!id) {
    return { status: 'error', message: 'Note id is required' }
  }

  try {
    await removeNote(id);
  
    //TODO: read more about revalidatePath()
    revalidatePath(routes.board);
  
    return {status: 'success'}

  } catch {
    return {status: 'error', message: 'Failed to remove note'}
  }

}
