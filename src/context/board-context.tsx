"use client"

import { createNoteAction, NoteActionState } from "@/actions/note-actions"
import { updateNoteColorAction, UpdateNoteColorState } from "@/actions/update-note-color-action"
import { OPTIMISTIC_NOTE } from "@/constants/optimistic-note"
import { NotesDTO, UpdateNoteDTO } from "@/types/notes"
import {
	createContext,
	FC,
	ReactNode,
	startTransition,
	use,
	useActionState,
	useOptimistic,
} from "react"

type OptimisticAction =
	| { type: "add"; note: NotesDTO }
	| { type: "remove"; id: string }
	| { type: "update"; payload: { id: string; data: UpdateNoteDTO } }

const notesReducer = (currentState: NotesDTO[], action: OptimisticAction) => {
	switch (action.type) {
		case "add":
			return [action.note, ...currentState]
		case "remove":
			return currentState.filter((note) => note.id !== action.id)
		case "update":
			const currentNoteIndex = currentState.findIndex((note) => note.id === action.payload.id)
			currentState[currentNoteIndex] = {
				...currentState[currentNoteIndex],
				...action.payload.data,
			}
			return currentState
	}
}

type BoardContextType = {
	optimisticNotesList: NotesDTO[]
	handleAddAction: (formData: FormData) => void
	handleRemoveAction: (id: string) => void
	handleColorAction: (formData: FormData) => void
	newNote: NoteActionState
	colorState: UpdateNoteColorState
}

type BoardProviderProps = {
	notePromise: Promise<NotesDTO[]>
	children: ReactNode
}

const BoardContext = createContext<BoardContextType | null>(null)

export const BoardProvider: FC<BoardProviderProps> = ({ notePromise, children }) => {
	const notes = use(notePromise)
	const [newNote, newNoteAction] = useActionState(createNoteAction, { status: "idle" })
	const [colorState, setColorAction] = useActionState(updateNoteColorAction, { status: "idle" })

	const [optimisticNotesList, dispatchOptimistic] = useOptimistic(notes, notesReducer)

	function handleAddAction(formData: FormData) {
		const content = formData.get("content")?.toString().trim() ?? ""

		dispatchOptimistic({ type: "add", note: { ...OPTIMISTIC_NOTE, content } })
		formData
			.entries()
			.forEach(([key, value]) => (console.log("key", key), console.log("value", value)))

		newNoteAction(formData)
	}

	function handleRemoveAction(id: string) {
		dispatchOptimistic({ type: "remove", id })
	}

	function handleColorAction(formData: FormData) {
		const id = formData.get("id")!.toString()
		const color = formData.get("color")?.toString()

		startTransition(() => {
			dispatchOptimistic({ type: "update", payload: { id, data: { color } } })
			setColorAction(formData)
		})
	}

	const props = {
		optimisticNotesList,
		handleAddAction,
		handleRemoveAction,
		handleColorAction,
		newNote,
		colorState,
	}

	return <BoardContext.Provider value={props}>{children}</BoardContext.Provider>
}

export const useBoardContext = () => {
	const context = use(BoardContext)
	if (!context) throw new Error("useBoardContext must be used within BoardProvider")
	return context
}
