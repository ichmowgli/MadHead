'use client';

import Editor from '@/app/(main)/_components/editor';
import { useNoteStore } from '@/app/store';
import { notes } from '@prisma/client';
import { Loader } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function NotePage({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const id = Number(noteId);

  const { fetchNote, updateNote } = useNoteStore();

  const [content, setContent] = useState<string>('');
  const [editorText, setEditorText] = useState<string>('');

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
    return (
      <div className='flex h-full w-full items-center justify-center  '>
        <Loader className='h-2 w-2 animate-spin md:h-4 md:w-4 lg:h-10 lg:w-10' />
      </div>
    );
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
        className='mt-12 break-words bg-transparent px-4 text-left text-2xl font-bold text-[#3F3F3F] outline-none out-of-range:text-red-500 dark:text-[#CFCFCF] md:px-12 md:text-3xl lg:text-5xl'
        value={title}
        onChange={onTitleChange}
        placeholder='Title'
        maxLength={19}
      />
      <div className='w-full items-center justify-center p-2 px-4 md:max-w-3xl md:px-12 lg:max-w-6xl '>
        <Editor
          content={content}
          setContent={setContent}
          editorText={editorText}
        />
      </div>
    </div>
  );
}
