'use client'

import { FC, use, useActionState, useOptimistic } from "react";
import { BoardClientType } from "@/types/board/board-client-types";
import { createNoteAction } from "@/actions/note-actions";
import { AddNoteForm } from "@/componenst/board/add-note-form";
import { NotesDTO } from "@/types/notes";
import { NoteList } from "@/componenst/board/note-list";
import { OPTIMISTIC_NOTE } from "@/constants/optimisticNote";

const notesReducer = (currentState: NotesDTO[], newNote: NotesDTO) => {
  return [newNote, ...currentState];
}

export const BoardClient: FC<BoardClientType> = ({ notePromise }) => {
  const notes = use(notePromise);

  const [optimisticNotesList, setOptimisticNotesList] = useOptimistic(
    notes,
    notesReducer
  );
  const [state, action] = useActionState(createNoteAction, { status: 'idle' });

  async function handleAction(formData: FormData) {
    const content = formData.get('content')?.toString().trim() ?? '';

    setOptimisticNotesList({...OPTIMISTIC_NOTE, content});

    action(formData);
  }

  return (
    <>
      <AddNoteForm state={state} handleAction={handleAction}/>
      <NoteList notesList={optimisticNotesList}/>
    </>
  )
}