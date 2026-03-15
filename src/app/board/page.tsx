import { JSX, Suspense } from "react";
import { getNotes } from "@/services/notes";
import type { NotesDTO } from "@/types/notes";
import { NotesSkeleton } from "@/components/board/note-skeleton";
import { BoardClient } from "@/components/board/board-client";

export default function BoardPage(): JSX.Element {
  // call the getNotes at the server components and throw data to client component
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
