import { FileIcon } from 'lucide-react';

import { Item } from './item';
import { useEffect, useState } from 'react';
import { notes } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

const fetchNotes = async () => {
  return (await fetch('http://localhost:3000/api/notes')).json();
};

export const NoteList = () => {
  const [notes, setNotes] = useState<notes[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchNotes().then((data) => {
      setNotes(data.data);
    });
  }, []);

  const onRedirect = (noteId: number) => {
    router.push(`/notes/${noteId}`);
  };

  if (notes === undefined) {
    return (
      <>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-6 w-20' />
      </>
    );
  }

  return (
    <>
      {notes.map((note) => (
        <Item
          onClick={() => onRedirect(note.id)}
          key={note.id}
          label={note.title}
          icon={FileIcon}
        />
      ))}
    </>
  );
};
