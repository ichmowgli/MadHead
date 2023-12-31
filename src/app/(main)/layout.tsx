'use client';

import { useUser } from '@clerk/nextjs';

import Sidebar from './_components/sidebar';
import { SettingsTheme } from '@/components/settings-theme';
import { SearchCommand } from '@/components/search-note';

import { Loader } from 'lucide-react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <div className='flex h-full w-full items-center justify-center  '>
        <Loader className='h-2 w-2 animate-spin md:h-4 md:w-4 lg:h-10 lg:w-10' />
      </div>
    );

  return (
    <div className='relative flex h-screen w-screen flex-row bg-background dark:bg-[#1f1f1f]'>
      <Sidebar />

      <main className='h-full flex-1 overflow-y-auto'>
        <SearchCommand />
        <SettingsTheme />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
