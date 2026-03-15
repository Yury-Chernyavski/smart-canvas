"use client"

import { AddNoteForm } from "@/components/board/add-note-form"
import { NoteList } from "@/components/board/note-list"
import { BoardProvider } from "@/context/board-context"
import { BoardClientType } from "@/types/board/board-client-types"
import { FC } from "react"

export const BoardClient: FC<BoardClientType> = ({ notePromise }) => {
	return (
		<BoardProvider notePromise={notePromise}>
			<AddNoteForm />
			<NoteList />
		</BoardProvider>
	)
}
