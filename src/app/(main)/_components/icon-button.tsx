import React from "react";

import { cn } from "@/lib/utils";

type IconButtonProps = {
  children: React.ReactNode;
};

const IconButton = ({
  children,
  className,
  ...rest
}: IconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn("rounded-full bg-white p-3 dark:bg-secondary " + className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
