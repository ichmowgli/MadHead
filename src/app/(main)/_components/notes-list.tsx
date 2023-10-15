import { FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Doer } from "./doer";
import { useEffect, useState } from "react";
import { notes } from "@prisma/client";

const fetchNotes = async () => {
  return (await fetch("http://localhost:3000/api/notes")).json();
};

export const NoteList = () => {
  const [notes, setNotes] = useState<notes[]>([]);

  useEffect(() => {
    fetchNotes().then((data) => {
      setNotes(data.data);
    });
  }, []);

  //   const notes = await prisma.notes.findMany();

  if (notes === undefined) {
    return <> No notes</>;
  }

  return (
    <>
      {notes.map((note) => (
        <div key={note.id}>
          <Doer label={note.title} isSearch icon={FileIcon} />
        </div>
      ))}
    </>
  );
};
