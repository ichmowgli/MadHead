import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, Plus } from "lucide-react";

import LogoutHelper from "./logout-helper";
import IconButton from "./icon-button";
import ActionItems from "./action-items";
import { Doer } from "./doer";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { NoteList } from "./notes-list";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

export const Sidebar = ({
  showSidebar,
  setShowSidebar,
  userId,
}: SidebarProps) => {
  const router = useRouter();

  const handleCreate = () => {
    const promise = fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: "New page",
        content: "1",
        isPublished: false,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/notes/${data.data.id}`);
      });

    toast.promise(promise, {
      loading: "Creating...",
      success: "Created!",
      error: "Error creating note",
    });
  };

  return (
    <>
      <aside
        className={cn(
          "z-500 absolute bottom-0 left-0 right-0 top-0 flex h-full flex-col gap-y-5 shadow-2xl shadow-slate-400 transition-transform duration-300 dark:bg-secondary dark:shadow-neutral-950 md:bottom-auto md:left-auto md:right-auto md:top-auto md:m-4 md:h-[calc(96%)] md:w-52 md:rounded-xl",
          showSidebar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Toggle Button for Sidebar (Mobile) */}
        <IconButton
          onClick={() => setShowSidebar(!showSidebar)}
          className={`fixed right-0 top-0 z-10 ml-auto md:hidden`}
        >
          <ChevronsRight
            className={cn(
              "duration-400 h-6 w-6 text-black transition-transform dark:text-slate-100",
            )}
          />
        </IconButton>
        {/* Toggle Button for Sidebar (Desktop) */}
        <IconButton
          onClick={() => setShowSidebar(!showSidebar)}
          className="z-100 absolute -right-5 top-1/2 hidden md:block"
        >
          <ChevronsLeft
            className={cn(
              "duration-400 h-5 w-5 translate-x-1 text-black transition-transform dark:text-slate-100",
              showSidebar ? "" : "rotate-180",
            )}
          />
        </IconButton>
        {/* Sidebar Content */}
        <div>
          <LogoutHelper />
          <ActionItems />
        </div>
        <div className="mt-4">
          <Doer
            onClick={handleCreate}
            icon={Plus}
            label="Add a page"
          />
        </div>
        <NoteList />
      </aside>
    </>
  );
};
