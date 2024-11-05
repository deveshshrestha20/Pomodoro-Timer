"use client";
import React from "react";
import { rowdies } from "../fonts/fonts";
import { useTimeContext } from "../context/breakTimeProvider";



const Break: React.FC = () => {
  const { setTotalTime, setIsBreakActive } = useTimeContext();
  return (
    <div
      className="h-10 w-80 bg-foreground bg-opacity-20 rounded-lg m-2 flex justify-center items-center"
      onClick={() => {
        setTotalTime(300);
      }}
    >
      <button
        className={`${rowdies.className} text-3xl text-clockground text-center p-1  `}
        onClick={()=> setIsBreakActive(true)}
      >
        Break
      </button>
    </div>
  );
};

export default Break;
