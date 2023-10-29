'use client';

import React from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { toast } from 'react-hot-toast';

import { useNoteStore } from '@/app/store';
import { EMPTY_CONTENT } from '@/app/constants';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { addNote } = useNoteStore();
  const notes = useNoteStore((s) => s.notes);

  const handleCreate = () => {
    const promise = addNote({
      title: 'New note',
      content: EMPTY_CONTENT,
    }).then((note) => {
      router.push(`/notes/${note.id}`);
    });

    toast.promise(promise, {
      loading: 'Creating...',
      success: 'Created!',
      error: 'Error creating note',
    });
  };

  if (notes.length === 0)
    return (
      <div className=' flex h-full flex-col items-center justify-center space-y-4'>
        <Image
          src='/new_note.svg'
          height='300'
          width='300'
          alt='Create New Note'
          className='dark:hidden'
          rel='preload'
          loading='eager'
        />
        <Image
          src='/new_note-dark.png'
          height='300'
          width='300'
          alt='Create New Note'
          className='hidden dark:block'
          rel='preload'
          loading='eager'
        />
        <h2 className='text-lg font-medium'>
          Welcome to {user?.firstName}&apos;s MadHead
        </h2>
        <Button onClick={handleCreate}>
          <PlusCircle className='mr-2 h-4 w-4' />
          Create a new note
        </Button>
      </div>
    );

  return (
    <>
      <div className='flex h-full flex-col gap-y-4 px-4 pt-12 md:px-12 '>
        <h2 className='break-words text-left text-2xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF] md:text-3xl lg:text-5xl'>
          Your Notes
        </h2>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5'>
          {notes.map((note) => (
            <a href={`/notes/${note.id}`} key={note.id}>
              <div className='flex flex-col overflow-hidden rounded-lg border border-muted-foreground bg-secondary transition hover:-translate-y-1 hover:shadow-xl'>
                <div className='p-4'>
                  <h3 className='truncate text-xl font-semibold text-[#3F3F3F] dark:text-[#CFCFCF]'>
                    {note.title}
                  </h3>
                  <div className='h-1'></div>
                  <p className='text-sm text-gray-500'>
                    Updated at: <br />
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
