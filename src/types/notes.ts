import { z } from 'zod';
import { createNoteSchema } from "@/lib/validations/note-schema";

export type NotesDTO = {
  id: string;
  created_at: string;
  content: string;
  color: string;
  position_x: number;
  position_y: number;
}

/*export type CreateNotesDTO = {
  content: string;
  color?: string;
  position_x: number;
  position_y: number;
}*/

export type CreateNotesDTO = z.infer<typeof createNoteSchema>