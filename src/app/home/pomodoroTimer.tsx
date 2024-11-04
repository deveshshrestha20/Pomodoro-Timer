"use client";
import React from "react";
import { Rowdies } from "next/font/google";
import { useTimeContext } from "../context/breakTimeProvider";

const rowdies = Rowdies({
  weight: "300", // Slightly bold
  subsets: ["latin"],
  display: "swap",
});

const PomodoroTimer: React.FC = () => {
  const { setTotalTime } = useTimeContext();

  return (
    <div
      className="h-10 w-80 bg-foreground bg-opacity-20 rounded-md m-2 flex justify-center items-center"
      onClick={() => setTotalTime(1500)}
    >
      <button
        className={`${rowdies.className} text-2xl   text-center p-1 text-clockground `}
      >
        Pomodoro Timer
      </button>
    </div>
  );
};

export default PomodoroTimer;
