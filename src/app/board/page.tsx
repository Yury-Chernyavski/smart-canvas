import { JSX, Suspense } from "react";
import { getNotes } from "@/services/notes";
import type { NotesDTO } from "@/types/notes";
import { NotesSkeleton } from "@/componenst/board/note-skeleton";
import { BoardClient } from "@/componenst/board/board-client";

export default function BoardPage (): JSX.Element {
  const notePromise: Promise<NotesDTO[]> = getNotes();

  return (
    <main>
      <h1>Board</h1>
      <Suspense fallback={<NotesSkeleton />}>
        <BoardClient notePromise={notePromise}/>
      </Suspense>
    </main>
  );
};