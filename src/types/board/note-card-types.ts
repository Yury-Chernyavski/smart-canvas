import { NotesDTO } from "@/types/notes";

export type NoteCardType = {
  note: NotesDTO,
  isOptimistic?: boolean,
}