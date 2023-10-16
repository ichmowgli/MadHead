'use client';

import { useScrollTop } from '@/hooks/use-scroll-top';

import { SignInButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

import { Logo } from './logo';

export const Navbar = () => {
  const scrolled = useScrollTop();

  const { isSignedIn } = useUser();

  if (isSignedIn) {
    redirect('/notes');
  }

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1f1f1f]',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='mx-2 flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end'>
        <SignInButton
          mode='modal'
          afterSignInUrl='/notes'
          afterSignUpUrl='/notes'
        >
          <Button variant='ghost' size='sm'>
            Log in
          </Button>
        </SignInButton>
      </div>
      <ModeToggle />
    </div>
  );
};
