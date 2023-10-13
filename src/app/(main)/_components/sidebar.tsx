import React from "react";

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import IconButton from "./icon-button";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { user } = useUser();

  return (
    <>
      <aside
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full flex-col gap-y-5 p-2 shadow-2xl shadow-slate-400 transition-transform duration-300 dark:bg-secondary dark:shadow-neutral-950 md:bottom-auto md:left-auto md:right-auto md:top-auto md:m-4 md:h-[calc(96%)] md:w-[350px] md:rounded-xl md:p-5',
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Toggle Button for Sidebar (Mobile) */}
        <IconButton
          onClick={() => setShowSidebar(!showSidebar)}
          extraClasses={`fixed z-10 ml-auto top-0 right-0 md:hidden`}
        >
          <ArrowRightToLine
            className={`duration-400 h-6 w-6 text-black transition-transform dark:text-slate-100 ${
              showSidebar ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </IconButton>

        {/* Toggle Button for Sidebar (Desktop) */}

        <IconButton
          onClick={() => setShowSidebar(!showSidebar)}
          extraClasses='absolute top-1/2 -right-5 z-10 hidden md:block'
        >
          <ArrowLeftToLine
            className={`duration-400 6-5 w-6 translate-x-1 text-black transition-transform dark:text-slate-100 ${
              showSidebar ? '' : 'rotate-180'
            }`}
          />
        </IconButton>

        {/* Info User Section */}
        <div className='relative flex min-w-fit flex-row md:p-3 items-center gap-4'>
          {user ? (
            <UserButton />
          ) : (
            <Skeleton className='h-8 w-8 rounded-full' />
          )}
          {user ? (
            <h4 className='truncate text-xl font-semibold text-slate-500 dark:text-slate-300'>
              Hi there,{' '}
              <span className='text-slate-900 dark:text-slate-100'>
                {user?.firstName}{' '}
              </span>
            </h4>
          ) : (
            <Skeleton className='h-6 w-40' />
          )}
        </div>
      </aside>
    </>
  );
};
