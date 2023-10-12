"use client";

import { ArrowRight } from "lucide-react";
import TypingTitle from "./typing-title";

import { Button } from "@/components/ui/button";

export const Heading = () => {
  return (
    <div>
      <div className="max-w-3xl space-y-6">
        <h1 className="font-semibold text-3xl sm:text-5xl md:text-6xl text-center">
          MadHead is your <br />
          <span className="text-green-600 font-bold dark:text-green-500">
            note-taking
          </span>{" "}
          {""}
          <span className="hover:underline hover:decoration-wavy">
            assistant
          </span>
        </h1>
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-center">
          <TypingTitle />
        </h2>

        <Button className="bg-green-600 dark:bg-green-500">
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};
