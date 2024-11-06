"use client";
import React from "react";
import { rowdies } from "../fonts/fonts";
import { useTimeContext } from "../context/breakTimeProvider";



const Break: React.FC = () => {
  const { setTotalTime, setIsBreakActive,setIsStartRunning, setIsActive } = useTimeContext();
  return (
    <div
      className="h-10 w-80 bg-foreground bg-opacity-20 rounded-lg m-2 flex justify-center items-center"
      onClick={() => {
        setTotalTime(300); // Break time 
        setIsStartRunning(false); // For indicating that isStart button is not runnning 
        setIsBreakActive(true); // Break button click bhako bhanera indicate garne state
        setIsActive(false); // Main state for resetting and stopping the timer
        
      }}
    >
      <button
        className={`${rowdies.className} text-3xl text-clockground text-center p-1  `}
      >
        Break
      </button>
    </div>
  );
};

export default Break;
