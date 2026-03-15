"use client"

import { createNoteAction, NoteActionState } from "@/actions/note-actions"
import { OPTIMISTIC_NOTE } from "@/constants/optimisticNote"
import { NotesDTO } from "@/types/notes"
import { createContext, FC, ReactNode, use, useActionState, useOptimistic } from "react"

type OptimisticAction = { type: "add"; note: NotesDTO } | { type: "remove"; id: string }

const notesReducer = (currentState: NotesDTO[], action: OptimisticAction) => {
	switch (action.type) {
		case "add":
			return [action.note, ...currentState]
		case "remove":
			return currentState.filter((note) => note.id !== action.id)
	}
}

type BoardContextType = {
	optimisticNotesList: NotesDTO[]
	handleAddAction: (formData: FormData) => void
	handleRemoveAction: (id: string) => void
	state: NoteActionState
}

type BoardProviderProps = {
	notePromise: Promise<NotesDTO[]>
	children: ReactNode
}

const BoardContext = createContext<BoardContextType | null>(null)

export const BoardProvider: FC<BoardProviderProps> = ({ notePromise, children }) => {
	const notes = use(notePromise)

	const [optimisticNotesList, dispatchOptimistic] = useOptimistic(notes, notesReducer)

	const [state, action] = useActionState(createNoteAction, { status: "idle" })

	function handleAddAction(formData: FormData) {
		const content = formData.get("content")?.toString().trim() ?? ""

		dispatchOptimistic({ type: "add", note: { ...OPTIMISTIC_NOTE, content } })
		action(formData)
	}

	function handleRemoveAction(id: string) {
		dispatchOptimistic({ type: "remove", id })
	}

	return (
		<BoardContext.Provider
			value={{ optimisticNotesList, handleAddAction, handleRemoveAction, state }}>
			{children}
		</BoardContext.Provider>
	)
};

export const useBoardContext = () => {
	const context = use(BoardContext);
	if (!context) throw new Error('useBoardContext must be used within BoardProvider')
	return context;
};
