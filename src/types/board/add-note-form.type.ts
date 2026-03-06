import { NoteActionState } from "@/actions/note-actions";

export type AddNoteFormType = {
  state: NoteActionState,
  handleAction(formData: FormData): Promise<void>;
}