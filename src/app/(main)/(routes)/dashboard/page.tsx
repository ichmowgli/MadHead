"use client";

import React from "react";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center space-y-4 p-2  md:p-5">
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
    </>
  );
};

export default DashboardPage;
