"use client";
import React from "react";
import { rowdies } from "../fonts/fonts";
import { useTimeContext } from "../context/breakTimeProvider";



const PomodoroTimer: React.FC = () => {
  const { setTotalTime, setIsBreakActive,setIsActive } = useTimeContext();

  return (
    <div
      className="h-10 w-[23rem] bg-foreground bg-opacity-20 rounded-lg m-2 flex justify-center items-center"
      onClick={() => {
        setTotalTime(1500)
        setIsBreakActive(false); // Timer click garda breakActive false hunxha 
        setIsActive(false);
        


      }
      }
    >
      <button
        className={`${rowdies.className} text-3xl  text-clockground text-center p-1 `}
      >
       Timer
      </button>
    </div>
  );
};

export default PomodoroTimer;
