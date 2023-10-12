"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const scrolled = useScrollTop();

  const { isSignedIn } = useUser();

  if (isSignedIn) {
    redirect("/dashboard");
  }

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 mx-2">
        <SignInButton
          mode="modal"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </SignInButton>
      </div>
      <ModeToggle />
    </div>
  );
};
