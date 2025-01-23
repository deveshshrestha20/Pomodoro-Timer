"use client";
import { useState, useEffect } from "react";
import {
  FiVolume2,
  FiVolumeX,
  FiChevronRight,
  FiChevronLeft,
  FiUsers,
} from "react-icons/fi";
import { ElasticSlider } from "./elasticSlider";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { MdVolumeMute } from "react-icons/md";
import { useRoomContext } from "@/app/context/roomProvider";
import { getSocket } from "../socketUtil/socketInstance";
import Image from "next/image";
import useSound from "use-sound";

// Define interfaces for type safety
interface Participant {
  id: string;
  name: string;
  online: boolean;
  imageUrl?: string;
}

const GroupPomodoroSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSound, setCurrentSound] = useState("Rain");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [volume, setVolume] = useState(50); // Volume as percentage (0 - 100)

  const { roomID } = useRoomContext();
  const socket = getSocket();

  const sounds = ["Rain", "Forest", "Coffee Shop", "White Noise", "Ocean"];
  const soundFiles: Record<string, string> = {
    Rain: "/sounds/rain.mp3",
    Forest: "/sounds/forest.mp3",
    "Coffee Shop": "/sounds/coffee-shop.mp3",
    "White Noise": "/sounds/white-noise.mp3",
    Ocean: "/sounds/ocean.mp3",
  };

  const [playSound, { stop }] = useSound(soundFiles[currentSound], {
    volume: volume / 100, // Default volume (can be adjusted using the slider)
    interrupt: true, // Stop the previous sound when a new sound is played
    key: currentSound, // Force re-initialization when sound changes
    loop: true,
  });

  useEffect(() => {
    // Stop any currently playing sound when switching sounds or when component unmounts
    stop();
    if (!isMuted) playSound(); // Play the new sound if not muted
  }, [currentSound, isMuted, playSound, stop]);

  useEffect(() => {
    if (!socket || !roomID) {
      // Clear participants and count when no room or socket
      setParticipants([]);
      setUserCount(0);
      return;
    }

    const handleUserCount = (count: number) => setUserCount(count);
    const handleRoomUsers = (users: Participant[]) => setParticipants(users);
    const handleDisconnect = () => {
      setParticipants([]);
      setUserCount(0);
    };

    // Attach listeners
    socket.on("userCount", handleUserCount);
    socket.on("roomUsers", handleRoomUsers);
    socket.on("disconnect", handleDisconnect);

    // Clean up listeners on unmount or dependency change
    return () => {
      socket.off("userCount", handleUserCount);
      socket.off("roomUsers", handleRoomUsers);
      socket.off("disconnect", handleDisconnect);

      // Clear state
      setParticipants([]);
      setUserCount(0);
    };
  }, [socket, roomID]);

  const handleSoundChange = (sound: string) => {
    setCurrentSound(sound);
    if (!isMuted) playSound();
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (prev) playSound(); // Resume playback if unmuted
      else stop(); // Stop playback if muted
      return !prev;
    });
  };

  const ParticipantAvatar = ({ participant }: { participant: Participant }) => {
    if (participant.imageUrl) {
      return (
        <div className="relative h-10 w-10">
          <Image
            src={participant.imageUrl}
            alt={`${participant.name}'s avatar`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="h-10 w-10 rounded-full bg-[#2c212b] text-[#e4d5e3] flex items-center justify-center font-medium">
        {participant.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen bg-[#3c313b]/95 backdrop-blur-lg transition-all duration-300 z-20 border-opacity-55 rounded-sm ${
        isExpanded ? "w-80" : "w-24"
      } shadow-[0_10px_20px_rgba(0,0,0,0.3),0_6px_6px_rgba(0,0,0,0.2)]`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -left-3 top-1/2 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-l-lg bg-[#3c313b] shadow-lg hover:bg-[#4c414b] transition-colors"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <FiChevronRight className="text-[#e4d5e3]" />
        ) : (
          <FiChevronLeft className="text-[#e4d5e3]" />
        )}
      </button>

      <div className="flex h-full flex-col p-4">
        <div className="flex flex-col items-center space-y-6 mb-6">
          <div className="relative">
            <FiUsers className="text-2xl text-[#e4d5e3] hover:text-[#f5e6f4] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#8a7089] text-[#e4d5e3] text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {userCount}
            </span>
          </div>
          <button
            onClick={toggleMute}
            className="rounded-full p-2 hover:bg-[#4c414b] transition-all duration-300"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <FiVolumeX className="text-xl text-[#e4d5e3]" />
            ) : (
              <FiVolume2 className="text-xl text-[#e4d5e3]" />
            )}
          </button>
        </div>

        {isExpanded && (
          <>
            <div className="mb-8 flex-1 overflow-y-auto">
              <h2 className="mb-6 text-xl font-bold text-[#e4d5e3]">
                Participants ({userCount})
              </h2>
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 rounded-xl bg-[#4c414b]/50 p-3 hover:bg-[#4c414b]/70 transition-colors"
                  >
                    <ParticipantAvatar participant={participant} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#e4d5e3]">
                        {participant.name}
                      </div>
                      <div className="text-xs text-[#e4d5e3]/70">
                        {participant.online ? 'Online' : 'Offline'}
                      </div>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${participant.online ? 'bg-green-400' : 'bg-[#2c212b]'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#4c414b] pt-4">
              <div className="mb-4 flex items-center justify-between">
                <select
                  value={currentSound}
                  onChange={(e) => handleSoundChange(e.target.value)}
                  className="rounded-lg bg-[#2c212b] px-3 py-2 text-sm text-[#e4d5e3] hover:bg-[#4c414b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8a7089]"
                >
                  {sounds.map((sound) => (
                    <option key={sound} value={sound}>
                      {sound}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <ElasticSlider
                  leftIcon={<MdVolumeMute />}
                  rightIcon={<IoVolumeMediumSharp />}
                  startingValue={0}
                  
                  maxValue={100}
                  isStepped
                  stepSize={10}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupPomodoroSidebar;
