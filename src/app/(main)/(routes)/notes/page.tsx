'use client';

import React from 'react';
import Image from 'next/image';

import { useUser } from '@clerk/nextjs';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/app/store';
import { EMPTY_CONTENT } from '@/app/constants';

const DashboardPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { addNote } = useNoteStore();

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

  return (
    <>
      <div className=' flex h-full flex-col items-center justify-center space-y-4  p-2 md:p-5'>
        <Image
          src='/new_note.svg'
          height='300'
          width='300'
          alt='Create New Note'
          className='dark:hidden'
        />
        <Image
          src='/new_note-dark.svg'
          height='300'
          width='300'
          alt='Create New Note'
          className='hidden dark:block'
        />
        <h2 className='text-lg font-medium'>
          Welcome to {user?.firstName}&apos;s MadHead
        </h2>
        <Button onClick={handleCreate}>
          <PlusCircle className='mr-2 h-4 w-4' />
          Create a new note
        </Button>
      </div>
    </>
  );
};

export default DashboardPage;
