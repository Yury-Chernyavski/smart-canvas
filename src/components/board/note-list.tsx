import { NoteCard } from "@/components/card/note-card"
import { useBoardContext } from "@/context/board-context"
import { FC } from "react"

export const NoteList: FC = () => {
	const { optimisticNotesList } = useBoardContext()

	if (optimisticNotesList.length === 0) {
		return <div>There are note any notes!</div>
	}

	return (
		<>
			{optimisticNotesList.map((note) => (
				<NoteCard
					key={note.id}
					note={note}
				/>
			))}
		</>
	)
}
