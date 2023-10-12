"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypingTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Capture ideas.")
          .pauseFor(2000)
          .deleteAll()
          .typeString("Organize thoughts.")
          .pauseFor(2000)
          .deleteAll()
          .typeString("Boost productivity.")
          .pauseFor(2000)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypingTitle;

//Capture your ideas, organize your thoughts, and boost your productivity
