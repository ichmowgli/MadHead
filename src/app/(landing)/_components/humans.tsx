import Image from 'next/image';

export const Humans = () => {
  return (
    <div className='flex max-w-5xl flex-col items-center justify-center'>
      <div className='flex items-center'>
        <div className='relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]'>
          <Image
            src='/productivity.svg'
            fill
            className='object-contain dark:hidden'
            alt='Productivity'
          />
          <Image
            src='/productivity-dark.svg'
            fill
            className='hidden object-contain dark:block'
            alt='productivity'
          />
        </div>
        <div className='relative hidden h-[400px] w-[400px] md:block'>
          <Image
            src='/docs.svg'
            fill
            className='object-contain dark:hidden'
            alt='Organize your thoughts'
          />
          <Image
            src='/docs-dark.svg'
            fill
            className='hidden object-contain dark:block'
            alt='Organize your thoughts'
          />
        </div>
      </div>
    </div>
  );
};
