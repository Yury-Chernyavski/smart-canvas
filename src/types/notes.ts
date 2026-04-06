export type NotesDTO = {
  id: string;
  created_at: string;
  content: string;
  color: string;
  position_x: number;
  position_y: number;
}

export type UpdateNoteDTO = {
  color?: string
  position_x?: number
  position_y?: number
}

/*export type CreateNotesDTO = {
  content: string;
  color?: string;
  position_x: number;
  position_y: number;
}*/
