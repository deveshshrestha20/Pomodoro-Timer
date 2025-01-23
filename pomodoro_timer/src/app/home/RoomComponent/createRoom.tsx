"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRoomContext } from "@/app/context/roomProvider";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getSocket, connectSocket } from '../socketUtil/socketInstance';
import toast from "react-hot-toast";

const CreateRoom: React.FC = () => {
  const { isSignedIn, session } = useSession();
  const { roomID, setRoomID, userCount, setUserCount } = useRoomContext();
  const [inputRoomID, setInputRoomID] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  // Initialize socket connection and handle URL room
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        connectSocket();
        const socket = getSocket();

        // Handle connection events
        socket.on("connect", () => {
          setIsConnected(true);
          const urlParams = new URLSearchParams(window.location.search);
          const roomFromUrl = urlParams.get("room");

           // Send user info when connected
           if (session?.user) {
            socket.emit("updateUserInfo", {
              name: session.user.fullName || session.user.username,
              imageUrl: session.user.imageUrl,
              roomID: roomFromUrl || roomID
            });
          }

          
          if (roomFromUrl) {
            socket.emit("joinRoom", roomFromUrl);
            setRoomID(roomFromUrl);
          }
        });

        socket.on("disconnect", () => {
          setIsConnected(false);
          toast.error("Lost connection to server");
        });

        // Handle room events
        socket.on("error", (message: string) => {
          toast.error(message);
          setRoomID("");
          router.push('/');
        });

        socket.on("userCount", (count: number) => {
          setUserCount(count);
        });

        socket.on("roomCreated", (newRoomId: string) => {
          socket.emit("joinRoom", newRoomId);
          setRoomID(newRoomId);
          updateURL(newRoomId);
        });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to connect to server");
      }
    };

    initializeConnection();

    // Cleanup function
    return () => {
      const socket = getSocket();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("error");
      socket.off("userCount");
      socket.off("roomCreated");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRoomID, setUserCount, router, session, roomID]);


  // Update user info when room changes
  useEffect(() => {
    if (isConnected && session?.user && roomID) {
      const socket = getSocket();
      socket.emit("updateUserInfo", {
        name: session.user.fullName || session.user.username,
        imageUrl: session.user.imageUrl,
        roomID
      });
    }
  }, [roomID, session, isConnected]);

  const updateURL = useCallback((roomId: string) => {
    const newUrl = roomId 
      ? `${window.location.pathname}?room=${roomId}`
      : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }, []);

  const createRoom = useCallback(() => {
    if (!isConnected) {
      toast.error("Not connected to server. Please wait...");
      return;
    }

    const socket = getSocket();
    socket.emit("createRoom");
  }, [isConnected]);

  const handleJoinRoom = useCallback(() => {
    if (!isConnected) {
      toast.error("Not connected to server. Please wait...");
      return;
    }

    if (!inputRoomID.trim()) {
      toast.error("Please enter a valid Room ID!");
      return;
    }

    const socket = getSocket();
    socket.emit("joinRoom", inputRoomID);
    setRoomID(inputRoomID);
    updateURL(inputRoomID);
  }, [inputRoomID, isConnected, setRoomID, updateURL]);

  const copyRoomLink = useCallback(() => {
    const link = `${window.location.origin}${window.location.pathname}?room=${roomID}`;
    navigator.clipboard.writeText(link);
    toast.success("Room link copied to clipboard!");
  }, [roomID]);

  const handleDisconnect = useCallback(() => {
    if (roomID) {
      const socket = getSocket();
      socket.emit("disconnectRoom", roomID);
      setRoomID("");
      setUserCount(0);
      updateURL(""); 

      socket.removeAllListeners();

      router.push('/');
    }
  }, [roomID, setRoomID, router,setUserCount,updateURL]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isConnected && (
        <div className="text-red-500 animate-pulse">
          Connecting to server...
        </div>
      )}
      
      {!roomID ? (
        <div className="flex flex-col items-center space-y-2 p-6">
          <button
            className={`bg-clockground text-background px-4 py-2 rounded-lg transition-opacity ${
              !isConnected ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            onClick={createRoom}
            disabled={!isConnected}
          >
            Create Room
          </button>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={inputRoomID}
              onChange={(e) => setInputRoomID(e.target.value)}
              className={`border border-gray-300 text-clockground px-2 py-1 rounded-lg transition-opacity ${
                !isConnected ? 'opacity-50' : ''
              }`}
              disabled={!isConnected}
            />
            <button
              className={`bg-clockground text-background px-2 py-1 rounded-lg transition-opacity ${
                !isConnected ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              onClick={handleJoinRoom}
              disabled={!isConnected}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-clockground pt-6">Room ID: <strong>{roomID}</strong></p>
          <p className="text-clockground">Users in Room: {userCount}</p>
          <div className="flex gap-3">
            <button
              className="bg-clockground text-background px-4 py-2 rounded-lg mt-2 hover:opacity-90 transition-opacity"
              onClick={copyRoomLink}
            >
              Copy Room Link
            </button>
            <button
              className="bg-clockground text-white px-4 py-2 rounded-lg mt-2 hover:opacity-90 transition-opacity"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;