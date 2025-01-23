'use client'
import React, { createContext, ReactNode, useContext, useState } from "react";

interface RoomContextType {
    roomID: string | null,
    setRoomID: React.Dispatch<React.SetStateAction<string>>,
    isHost: boolean,
    setIsHost: React.Dispatch<React.SetStateAction<boolean>>,
    userCount: number,
    setUserCount: React.Dispatch<React.SetStateAction<number>>;
}

export const RoomContext = createContext<RoomContextType | undefined>(undefined);

const RoomProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [roomID, setRoomID] = useState<string>("");
    const [isHost, setIsHost] = useState<boolean>(false);
    const [userCount, setUserCount] = useState<number>(1);

    return (
        <RoomContext.Provider
        value={{
            roomID,
            setRoomID,
            isHost,
            setIsHost,
            userCount,
            setUserCount,
        }
        }
        
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    const context = useContext(RoomContext);
    if (context === undefined) {
        throw new Error('useRoomContext must be used within a RoomProvider');
    }
    return context;
};

export default RoomProvider;