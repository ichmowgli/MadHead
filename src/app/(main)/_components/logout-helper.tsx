"use client";

import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LogoutHelper() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      {/* LogOut Section */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="flex w-full items-center gap-4 hover:bg-primary/5 md:hover:rounded-t-xl"
          >
            <div className="flex w-full items-center gap-x-2 p-3 text-sm">
              {user ? (
                <Avatar className="h-5 w-5">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              ) : (
                <Skeleton className="h-5 w-5 rounded-full" />
              )}
              <div className="flex flex-col">
                {user ? (
                  <p className="text-start font-medium">Your Profile</p>
                ) : (
                  <Skeleton className="h-5 w-20" />
                )}
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-max-content"
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
            <SignOutButton signOutCallback={() => router.push("/")}>
              Log out
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
