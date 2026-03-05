import { FC } from "react";
import { NoteListProps } from "@/types/board/note-list-types";
import { NoteCard } from "@/componenst/board/note-card";

export const NoteList: FC<NoteListProps> = ({ notesList }) => {
  // const notes = use(notePromise);

  if (notesList.length === 0) {
    return (
      <div>
        Thera are note any notes!
      </div>
    )
  }

  return (
    <>
      {notesList.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </>
  )
}