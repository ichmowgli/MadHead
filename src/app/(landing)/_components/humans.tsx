import Image from "next/image";

export const Humans = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/productivity.svg"
            fill
            className="object-contain dark:hidden"
            alt="Productivity"
          />
          <Image
            src="/productivity-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="productivity"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/docs.svg"
            fill
            className="object-contain dark:hidden"
            alt="Organize your thoughts"
          />
          <Image
            src="/docs-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="Organize your thoughts"
          />
        </div>
      </div>
    </div>
  );
};
