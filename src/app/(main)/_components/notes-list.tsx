import { FileIcon } from 'lucide-react';

import { Item } from './item';
import { useEffect, useState } from 'react';
import { notes } from '@prisma/client';

const fetchNotes = async () => {
  return (await fetch('http://localhost:3000/api/notes')).json();
};

export const NoteList = () => {
  const [notes, setNotes] = useState<notes[]>([]);

  useEffect(() => {
    fetchNotes().then((data) => {
      setNotes(data.data);
    });
  }, []);

  if (notes === undefined) {
    return <> No notes</>;
  }

  return (
    <>
      {notes.map((note) => (
          <Item  key={note.id} label={note.title} isSearch icon={FileIcon} />
      ))}
    </>
  );
};
