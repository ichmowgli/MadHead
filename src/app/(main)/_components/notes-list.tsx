/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useNoteStore } from '@/app/store';

import { Item } from './item';
import { FileIcon } from 'lucide-react';

export const NoteList = () => {
  const router = useRouter();
  const params = useParams();
  const { notes, fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  const onRedirect = (noteId: number) => {
    router.push(`/notes/${noteId}`);
  };

  return (
    <>
      {notes.map((note) => (
        <Item
          onClick={() => onRedirect(note.id)}
          key={note.id}
          label={note.title}
          icon={FileIcon}
          active={params.noteId === `${note.id}`}
        />
      ))}
    </>
  );
};
