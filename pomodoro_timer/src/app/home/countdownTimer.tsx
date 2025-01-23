"use client";
import React, { useEffect, useCallback, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { useTimeContext } from "../context/breakTimeProvider";
import { useRoomContext } from "../context/roomProvider";
import { getSocket, connectSocket } from './socketUtil/socketInstance';
import toast from "react-hot-toast";
import useSound from "use-sound";



const CountdownTimer: React.FC = () => {
  const {
    totalTime,
    setTotalTime,
    isBreakActive,
    isActive,
    setIsActive,
    setIsFinished,
  } = useTimeContext();
  const { roomID } = useRoomContext();
  const [localInterval, setLocalInterval] = useState<NodeJS.Timeout | null>(null);

  const [playSound] = useSound('/audio/button-click.mp3',{volume:4.0});

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }, []);

  // Handle solo timer countdown
  const startSoloTimer = useCallback(() => {
    if (localInterval) clearInterval(localInterval);
    
    const interval = setInterval(() => {
      setTotalTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsActive(false);
          setIsFinished(true);
          toast.success(
            isBreakActive
              ? "Time for work! 💪"
              : "Time for a break! 🎉",
            { duration: 4000 }
          );
          setIsFinished(true)
          return isBreakActive ? 1500 : 300; // Switch between work and break time
        }
        return prevTime - 1;
      });
    }, 1000);

    setLocalInterval(interval);
  }, [setTotalTime, setIsActive, setIsFinished, isBreakActive, localInterval]);

  // Socket setup for group timer
  useEffect(() => {
    if (roomID) {
      connectSocket();
      const socket = getSocket();

      const handleTimerUpdate = (timerState: { totalTime: number; isActive: boolean }) => {
        setTotalTime(timerState.totalTime);
        setIsActive(timerState.isActive);
      };

      const handleTimerComplete = (isBreak: boolean) => {
        toast.success(
          isBreak
            ? "Time for a break! 🎉"
            : "Break's over! Back to work! 💪",
          { duration: 4000 }
        );
        setIsFinished(true);
      };

      socket.on("timerState", handleTimerUpdate);
      socket.on("timerComplete", handleTimerComplete);

      return () => {
        socket.off("timerState", handleTimerUpdate);
        socket.off("timerComplete", handleTimerComplete);
      };
    }
  }, [setTotalTime, setIsActive, setIsFinished, roomID]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (localInterval) {
        clearInterval(localInterval);
      }
    };
  }, [localInterval]);

  const handleStart = useCallback(() => {
    playSound();
    setIsActive(true);
    if (roomID) {
      const socket = getSocket();
      socket.emit("startTimer", roomID);
    } else {
      startSoloTimer();
    }
  }, [roomID, startSoloTimer, setIsActive, playSound]);

  const handlePause = useCallback(() => {
    playSound();
    setIsActive(false);
    if (roomID) {
      const socket = getSocket();
      socket.emit("pauseTimer", roomID);
    } else {
      if (localInterval) {
        clearInterval(localInterval);
        setLocalInterval(null);
      }
    }
  }, [roomID, localInterval, setIsActive,playSound]);

  const handleReset = useCallback(() => {
    playSound();
    const resetTime = isBreakActive ? 300 : 1500;
    setTotalTime(resetTime);
    setIsActive(false);

    if (roomID) {
      const socket = getSocket();
      socket.emit("resetTimer", { roomID, isBreak: isBreakActive });
    } else {
      if (localInterval) {
        clearInterval(localInterval);
        setLocalInterval(null);
      }
    }
  }, [roomID, isBreakActive, setTotalTime, setIsActive, localInterval, playSound]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1
  className="text-clockground text-[11em] font-sevenSegment gap-3 relative 
    transform transition-all duration-150 select-none
    drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)]
    
    bg-[#564f56]
    bg-opacity-0
   
    active:translate-y-[1px] active:drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]"
>
  {formatTime(totalTime)}
</h1>

      <div className="flex space-x-4 mt-4">
      {!isActive ? (
   <button 
   onClick={handleStart}
   className="h-10 w-56 rounded-lg
     bg-[#564f56] 
     flex items-center justify-center 
     transform transition-all duration-150
     relative
     border-b-4 border-[#3a343a]
     hover:translate-y-[2px] hover:border-b-[2px]
      active:translate-y-[4px] active:border-b-0
      shadow-[4px_4px_8px_rgba(0,0,0,0.3)]
      hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
      active:shadow-none"
 >
   <IoPlayOutline className="h-9 w-8 text-white relative z-10" />
 </button>
  ) : (
    <button 
    onClick={handlePause}
    className="h-10 w-56 rounded-lg
      bg-[#564f56] 
      flex items-center justify-center 
      transform transition-all duration-150
      relative
      border-b-4 border-[#3a343a]
      hover:translate-y-[2px] hover:border-b-[2px]
      active:translate-y-[4px] active:border-b-0
      shadow-[4px_4px_8px_rgba(0,0,0,0.3)]
      hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
      active:shadow-none"
  >
    <CiPause1 className="h-7 w-8 text-white relative z-10" />
  </button>
        )}
        <button 
  onClick={handleReset}
  className="h-10 w-56 rounded-lg
    bg-[#564f56] 
    flex items-center justify-center 
    transform transition-all duration-150
    relative
    border-b-4 border-[#3a343a]
    hover:translate-y-[2px] hover:border-b-[2px]
    active:translate-y-[4px] active:border-b-0
    shadow-[4px_4px_8px_rgba(0,0,0,0.3)]
    hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
    active:shadow-none"
>
  <VscDebugRestart className="h-7 w-14 text-white relative z-10" />
</button>
      </div>
    </div>
  );
};

export default CountdownTimer;