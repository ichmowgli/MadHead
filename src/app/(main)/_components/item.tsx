'use client';

import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ItemProps {
  id?: string;
  noteIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export const Item = ({
  label,
  onClick,
  icon: Icon,
  active,
  noteIcon,
  isSearch,
}: ItemProps) => {
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
    </div>
  );
};
