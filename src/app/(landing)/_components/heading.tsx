'use client';

import { ArrowRight } from 'lucide-react';
import TypingTitle from './typing-title';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Heading = () => {
  return (
    <div>
      <div className='max-w-3xl space-y-6'>
        <h1 className='text-center text-3xl font-semibold sm:text-5xl md:text-6xl'>
          MadHead is your <br />
          <span className='font-bold text-green-600 dark:text-green-500'>
            note-taking
          </span>{' '}
          {''}
          <span className='hover:underline hover:decoration-wavy'>
            assistant
          </span>
        </h1>
        <h2 className='text-center text-xl font-semibold sm:text-2xl md:text-3xl'>
          <TypingTitle />
        </h2>

        <div className='flex justify-center'>
          <Link href='/dashboard'>
            <Button className=' bg-green-600 dark:bg-green-500'>
              Get Started
              <ArrowRight className='ml-2 h-5 w-5' strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
