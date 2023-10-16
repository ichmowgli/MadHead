import { FileIcon } from 'lucide-react';
import { Item } from './item';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useNoteStore } from '@/app/store';

export const NoteList = () => {
  const router = useRouter();
  const params = useParams();
  const { notes, fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
