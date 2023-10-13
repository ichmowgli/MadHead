"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import IconButton from "../../_components/icon-button";
import {
  ChevronsLeft,
  ChevronsRight,
  MenuIcon,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

type DashboardPageProps = {
  shiftRight: boolean;
  setShiftRight: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardPage = ({ shiftRight, setShiftRight }: DashboardPageProps) => {
  const { user } = useUser();

  return (
    <>
      <div className="flex flex-col items-center justify-start p-2 md:p-5">
        {/* <IconButton
          className={cn(
            "z-100 fixed right-0 top-0 ml-auto md:hidden",
            shiftRight ? "translate-x-52" : "translate-x-0",
          )}
          onClick={() => setShiftRight(true)}
        >
          <MenuIcon
            className={cn(
              "duration-400 h-6 w-6 text-black text-muted-foreground transition-transform dark:text-slate-100",
            )}
          />
        </IconButton> */}

        <div
          className={cn(
            "flex h-full flex-col items-center justify-center space-y-4 p-2  md:p-5",
            shiftRight ? "translate-x-52" : "translate-x-0",
          )}
        >
          <Image
            src="/new_note.svg"
            height="300"
            width="300"
            alt="Create New Note"
            className="dark:hidden"
          />
          <Image
            src="/new_note-dark.svg"
            height="300"
            width="300"
            alt="Create New Note"
            className="hidden dark:block"
          />
          <h2 className="text-lg font-medium">
            Welcome to {user?.firstName}&apos;s MadHead
          </h2>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a new note
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
