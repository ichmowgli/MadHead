export const Footer = () => {
  return (
    <div className='z-50 flex w-full items-center justify-center bg-background p-6 dark:bg-[#1f1f1f]'>
      <p className='text-sm font-medium'>
        {new Date().getFullYear()} {''}
        <a
          className='font-bold hover:text-green-600'
          href='https://github.com/ichmowgli/'
        >
          @ichmowgli
        </a>
      </p>
    </div>
  );
};
