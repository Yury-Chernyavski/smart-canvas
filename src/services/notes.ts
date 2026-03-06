import { createClient } from "@/lib/supabase/service";
import type { CreateNotesDTO, NotesDTO } from "@/types/notes";

export const getNotes = async (): Promise<NotesDTO[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('notes')
    .select('id, created_at, content, color, position_x, position_y')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data as NotesDTO[];
}

export const createNote = async (dto: CreateNotesDTO): Promise<NotesDTO> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('notes')
    .insert(dto)
    .select()
    .single();

  if (error) throw error;

  return data as NotesDTO;
}

export const removeNote = async (id: NotesDTO["id"]): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
}