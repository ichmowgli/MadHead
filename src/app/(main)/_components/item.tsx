'use client';

import { LucideIcon, MoreHorizontal, Trash } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNoteStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TrashModal } from '@/components/providers/trash-modal';

interface ItemProps {
  id?: number;
  noteIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  isNote?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  updatedAt?: number;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  noteIcon,
  isSearch,
  isNote,
  updatedAt,
}: ItemProps) => {
  const router = useRouter();
  const { removeNote } = useNoteStore();

  const handleDelete = () => {
    if (!id) return;

    const promise = removeNote(id).then(() => {
      router.push(`/notes`);
    });

    toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted!',
      error: 'Error deleting note',
    });
  };

  let upd = new Date(updatedAt || 0).toLocaleString();
  return (
    <div
      onClick={onClick}
      role='button'
      className={cn(
        'group flex w-full items-center px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-primary/5',
        active && 'bg-primary/5 text-primary'
      )}
    >
      {noteIcon ? (
        <div className='mr-2 shrink-0'>{noteIcon}</div>
      ) : (
        <Icon className='mr-2 h-4 w-4 shrink-0 text-muted-foreground' />
      )}
      <span className='truncate'>{label}</span>
      {isSearch && (
        <>
          <kbd className='pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 text-[10px] font-medium text-muted-foreground'>
            <span className='text-xs'>⌘</span>K
          </kbd>
        </>
      )}
      {isNote && (
        <div className='ml-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role='button'
                className='ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600'
              >
                <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-42'
              align='start'
              side='right'
              forceMount
            >
              <DropdownMenuItem>
                <TrashModal onConfirm={() => handleDelete()}>
                  <div
                    role='button'
                    className='flex items-center justify-center gap-x-2 rounded-sm p-2'
                  >
                    <Trash className='mr-2 h-4 w-4' />
                    <p>Delete</p>
                  </div>
                </TrashModal>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='p-2 text-xs text-muted-foreground'>
                Last edited at: <br /> {upd}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
