import { NotesDTO } from "@/types/notes";

export type BoardClientType = {
  notePromise: Promise<NotesDTO[]>;
}