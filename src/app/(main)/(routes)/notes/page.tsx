'use client';

import React, { ElementRef, useRef } from 'react';
import Image from 'next/image';

import { useUser } from '@clerk/nextjs';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleCreate = () => {
    const promise = fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: 'New note',
        content: '1',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/notes/${data.data.id}`);
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
