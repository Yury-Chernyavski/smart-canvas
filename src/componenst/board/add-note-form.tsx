'use client'

import { FC } from "react";
import { SubmitButton } from "@/componenst/card/submit-button";
import { AddNoteFormType } from "@/types/board/add-note-form.type";

export const AddNoteForm: FC<AddNoteFormType> = ({ state, handleAction }) => {
  return (
    <form action={handleAction}>
      <textarea
        name="content"
        placeholder="Write a note..."
        rows={4}
      />

      {state.status === 'error' && (
        <p>{state.message}</p>
      )}

      {state.status === 'success' && (
        <p>Note is added!</p>
      )}

      <SubmitButton variant='primary'/>
    </form>
  );
}