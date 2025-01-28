"use client";
import React, { useCallback } from "react";
import { rowdies } from "../fonts/fonts";
import { useTimeContext } from "../context/breakTimeProvider";
import { useRoomContext } from "../context/roomProvider";
import { getSocket } from "./socketUtil/socketInstance";
import { useSound } from "use-sound";

const PomodoroTimer: React.FC = () => {
  const { setTotalTime, setIsBreakActive, setIsActive } = useTimeContext();
  const { roomID } = useRoomContext();
  const [playSound] = useSound("/audio/button-click.mp3", { volume: 4.0 });

  const handleTimerClick = useCallback(() => {
    playSound();
    setTotalTime(1500);
    setIsBreakActive(false);
    setIsActive(false);

    if (roomID) {
      const socket = getSocket();
      socket.emit("resetTimer", {
        roomID,
        isBreak: false,
      });
    }
  }, [roomID, setTotalTime, setIsBreakActive, setIsActive, playSound]);

  return (
    <div
      className="h-12 w-full sm:w-80 md:w-96 bg-clockground rounded-lg m-2 flex justify-center items-center transform transition-all duration-150 relative border-b-4 border-clockground border-opacity-35 hover:translate-y-[2px] hover:border-b-[2px] active:translate-y-[4px] active:border-b-0 shadow-[4px_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3)] active:shadow-none cursor-pointer"
      onClick={handleTimerClick}
    >
      <button
        className={`${rowdies.className} text-xl sm:text-2xl md:text-3xl text-background text-center p-1 relative z-10`}
      >
        Timer
      </button>
    </div>
  );
};

export default PomodoroTimer;