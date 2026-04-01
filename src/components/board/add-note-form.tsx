"use client"

import { SubmitButton } from "@/components/card/submit-button"
import { useBoardContext } from "@/context/board-context"
import { FC } from "react"

export const AddNoteForm: FC = () => {
  const { state, handleAddAction } = useBoardContext();

  return (
    <form action={handleAddAction}>
			<textarea
        name="content"
        placeholder="Write a note..."
        rows={4}
      />

      {state.status === "error" && 'fields' in state && state.fields?.content && (
        <p>{state.fields.content}</p>
      )}

      {state.status === 'error' && !('fields' in state) && (
        <p>{state.message}</p>
      )}

      {state.status === "success" && <p>Note is added!</p>}

      <SubmitButton variant="primary"/>
    </form>
  )
}
