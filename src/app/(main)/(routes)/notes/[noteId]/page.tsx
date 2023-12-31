'use client';

import React, { useEffect, useRef, useState } from 'react';
import { notes } from '@prisma/client';
import { useNoteStore } from '@/app/store';

import Editor from '@/app/(main)/_components/editor';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

  const onNoteUpdate = (title?: string, content?: string) => {
    updateNote(id, {
      title,
      content,
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (!note) {
    return (
      <div className='flex h-full w-full items-center justify-center  '>
        <Loader className='h-2 w-2 animate-spin md:h-4 md:w-4 lg:h-10 lg:w-10' />
      </div>
    );
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNoteUpdate(e.target.value, undefined);
    setTitle(e.target.value);
  };

  const onContentChange = (json: string) => {
    onNoteUpdate(undefined, json);
  };

  return (
    <>
      <div className='flex h-full flex-col space-y-4'>
        <Button className='mx-4 mt-12 w-fit md:mx-12' variant='primary'>
          <Link href='/notes' className='text-white'>
            Go to Notes
          </Link>
        </Button>
        <input
          id='title-input'
          ref={inputRef}
          className='mt-12 break-words bg-transparent px-4 text-left text-2xl font-bold text-[#3F3F3F] outline-none out-of-range:text-red-500 dark:text-[#CFCFCF] md:px-12 md:text-3xl lg:text-5xl'
          value={title}
          onChange={onTitleChange}
          placeholder='Title'
          maxLength={19}
        />
        <div className='w-full items-center justify-center p-2 px-4 md:max-w-3xl md:px-12 lg:max-w-6xl '>
          <Editor
            content={JSON.parse(note.content!)}
            setContent={onContentChange}
          />
        </div>
      </div>
    </>
  );
}
