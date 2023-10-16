import { FileIcon } from 'lucide-react';

import { Item } from './item';
import { useEffect, useState } from 'react';
import { notes } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams, useRouter } from 'next/navigation';
import { useNoteStore } from '@/app/store';


export const NoteList = () => {
  const router = useRouter();
  const params = useParams();
  const { notes, fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  // trunk-ignore(eslint/react-hooks/exhaustive-deps)
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
