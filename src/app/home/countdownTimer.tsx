/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { useTimeContext } from "../context/breakTimeProvider";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

// Initialize socket connection
const socket = io("http://localhost:3001");

const CountdownTimer: React.FC = () => {
  const { totalTime, setTotalTime } = useTimeContext();
  const { isBreakActive, setIsStartRunning, isActive, setIsActive, isFinished, setIsFinished } = useTimeContext();

  const initTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    // Listen for timer updates from the server
    socket.on("timerState", ({totalTime, isActive}) => {
        setTotalTime(totalTime);
        setIsActive(isActive);
    })

    socket.on("timerComplete", (BreakTime) => {
        if (BreakTime) {
          toast.success("Time for a break! 🎉", {
            duration: 4000,
          });
        } else {
          toast.success("Break's over! Back to work! 💪", {
            duration: 4000,
          });
        }
      });

    let timerInterval: NodeJS.Timeout | undefined;
    if (isActive && totalTime > 0) {
      timerInterval = setInterval(() => {
        setTotalTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setIsFinished(true);
            socket.emit("resetTimer", isBreakActive); // Reset the timer after completion
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      socket.off("timerComplete")
    };
  }, [isActive, totalTime, setTotalTime, setIsActive, setIsFinished, isBreakActive]);

  const handleStart = () => {
    setIsActive(true); // State indicating the timer is started and active
    setIsStartRunning(true); // For indicating that the start button is running
    socket.emit("startTimer"); // Emit start event to server   
  };

  const handlePause = () => {
    setIsActive(false); // State indicating the timer is not active
    setIsStartRunning(false); // For indicating that the start button is not running
    socket.emit("pauseTimer"); // Emit pause event to server
  };

  const handleReset = () => {
    if (isBreakActive==true) {
      setTotalTime(300); // Break time
      setIsActive(false); // The timer is not active
      setIsStartRunning(false); // Start button is not running
      socket.emit("resetTimer", true); // Emit reset event to server for break
    } else {
      setTotalTime(1500); // Pomodoro time
      setIsActive(false); // The timer is not active
      setIsStartRunning(false); // Start button is not running
      socket.emit("resetTimer", false); // Emit reset event to server for Pomodoro
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-clockground text-[11em] font-sevenSegment gap-3">
        {initTime(totalTime)}
      </h1>
      <div className="flex space-x-4 mt-4">
        {!isActive && !isFinished && (
          <button
            onClick={handleStart}
            className="h-10 w-56 rounded-lg flex items-center justify-center bg-[#564f56]"
          >
            <IoPlayOutline className="h-9 w-8 text-white" />
          </button>
        )}
        {isActive && (
          <button
            onClick={handlePause}
            className="h-10 w-56 rounded-lg flex items-center justify-center bg-[#564f56]"
          >
            <CiPause1 className="h-7 w-8 text-white" />
          </button>
        )}
        <button
          onClick={handleReset}
          className="h-10 w-56 rounded-lg flex items-center justify-center bg-[#564f56]"
        >
          <VscDebugRestart className="h-7 w-14 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
