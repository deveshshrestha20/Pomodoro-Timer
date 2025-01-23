"use client";
import React, { useCallback } from "react";
import { rowdies } from "../../../public/fonts/fonts";
import { useTimeContext } from "../context/breakTimeProvider";
import { useRoomContext } from "../context/roomProvider";
import { getSocket } from "./socketUtil/socketInstance";
import useSound from "use-sound";

const Break: React.FC = () => {
  const { 
    setTotalTime, 
    setIsBreakActive, 
    setIsStartRunning, 
    setIsActive 
  } = useTimeContext();
  const { roomID } = useRoomContext();

  const [playSound] = useSound('/audio/button-click.mp3',{volume:4.0});

  const handleBreakClick = useCallback(() => {
    // Update all timer-related states
    playSound();
    setTotalTime(300);
    setIsStartRunning(false);
    setIsBreakActive(true);
    setIsActive(false);

    // Handle socket emission
    const socket = getSocket();
    socket.emit("breakState", roomID || undefined);
  }, [roomID, setTotalTime, setIsStartRunning, setIsBreakActive, setIsActive, playSound]);

  return (
    <div className="h-11 w-80 bg-clockground rounded-lg m-2 flex justify-center items-center transform transition-all duration-150 relative border-b-4 border-clockground border-opacity-35 hover:translate-y-[2px] hover:border-b-[2px] active:translate-y-[4px] active:border-b-0 shadow-[4px_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3)] active:shadow-none cursor-pointer"
      onClick={handleBreakClick}
    >
      <button
        className={`${rowdies.className} text-3xl text-background text-center p-1 relative z-10`}
      >
        Break
      </button>
    </div>
  );
};

export default Break;