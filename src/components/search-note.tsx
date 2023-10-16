'use client';

import { useEffect } from 'react';
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
  const { notes } = useNoteStore();

  const { toggleSearch, isSearchOpen, closeSearch } = useSearch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (id: number) => {
    router.push(`/notes/${id}`);
    closeSearch();
  };

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={closeSearch}>
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
