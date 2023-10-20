'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useNoteStore } from '@/app/store';
import { useSettings } from '@/hooks/use-settings';
import { useSearch } from '@/hooks/use-search';

import toast from 'react-hot-toast';

import { cn } from '@/lib/utils';
import LogoutHelper from './logout-helper';
import { Item } from './item';
import { NoteList } from './notes-list';

import { ChevronsLeft, MenuIcon, Plus, Search, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { EMPTY_CONTENT } from '@/app/constants';

interface SidebarProps {
  userId: string;
}

const Sidebar = ({ userId }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { addNote } = useNoteStore();

  const search = useSearch();
  const settings = useSettings();

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
      <aside
        className={cn(
          'relative z-[50] flex h-full flex-col gap-y-5 overflow-hidden overflow-y-auto bg-secondary pb-5 transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-0' : 'w-full md:w-60'
        )}
      >
        <div
          onClick={handleCollapse}
          role='button'
          className='absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600'
        >
          <ChevronsLeft className='h-6 w-6' />
        </div>
        <div>
          <LogoutHelper />
          <Item
            label='Search'
            icon={Search}
            isSearch
            onClick={search.openSearch}
          />
          <Item
            label='Settings'
            icon={Settings}
            onClick={settings.openSettings}
          />
        </div>
        <div>
          <Item onClick={handleCreate} icon={Plus} label='Add a note' />
        </div>
        <Separator className='mx-auto w-11/12 bg-muted-foreground' />
        <div className='max-h-fit overflow-y-scroll'>
          <NoteList />
        </div>
      </aside>
      <div
        className={cn('absolute top-0 z-[999] w-full duration-0', {
          hidden: !isCollapsed,
        })}
      >
        {isCollapsed && (
          <nav className='w-full bg-transparent px-3 py-2'>
            <MenuIcon
              onClick={handleCollapse}
              role='button'
              className='h-6 w-6 text-muted-foreground'
            />
          </nav>
        )}
      </div>
    </>
  );
};

export default Sidebar;
