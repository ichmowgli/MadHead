'use client';

import { useEffect, useState } from 'react';
import { File } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useSearch } from '@/hooks/use-search';
import { useNoteStore } from '@/app/store';

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const notes = useNoteStore((store) => store.notes);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const onSelect = (id: number) => {
    router.push(`/notes/${id}`);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s MadHead...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Notes'>
          {notes?.map((note) => (
            <CommandItem
              key={note.id}
              value={`${note.id}-${note.title}`}
              title={note.title}
              onSelect={() => onSelect(note.id)}
            >
              <File className='mr-2 h-4 w-4' />
              <span>{note.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
