'use client';

import Editor from '@/app/(main)/_components/editor';
import { useNoteStore } from '@/app/store';
import { notes } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';

export default function NotePage({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const id = Number(noteId);

  const { fetchNote, updateNote } = useNoteStore();

  const [note, setNote] = useState<notes | undefined>(undefined);
  const [title, setTitle] = useState<string>(note?.title ?? '');

  useEffect(() => {
    fetchNote(id).then((d) => {
      if (!d) return;
      setNote(d);
      setTitle(d.title);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNoteUpdate = (title: string, content: string) => {
    updateNote(id, {
      title,
      content,
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (!note) {
    return <div>Loading...</div>;
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNoteUpdate(e.target.value, note.content!);
    setTitle(e.target.value);
  };

  return (
    <div className='flex h-full flex-col space-y-4'>
      <input
        id='title-input'
        ref={inputRef}
        className='break-words p-12 text-left text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]'
        value={title}
        onChange={onTitleChange}
      />
      <div className='border-3 border-red w-full p-6  md:max-w-3xl lg:max-w-4xl '>
        <Editor />
      </div>
    </div>
  );
}
