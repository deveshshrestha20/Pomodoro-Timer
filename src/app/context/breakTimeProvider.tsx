'use client'
import { createContext, ReactNode, useContext, useState } from "react";


interface TimeContextType {
    totalTime: number,
    setTotalTime: React.Dispatch<React.SetStateAction<number>>,
    isBreakActive: boolean,
    setIsBreakActive: React.Dispatch<React.SetStateAction<boolean>>;
}


export const TimeContext = createContext<TimeContextType>(null!);


const TimeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [totalTime, setTotalTime] = useState<number>(1500);
    const [isBreakActive, setIsBreakActive] = useState<boolean>(false);

    return (
        <TimeContext.Provider
        value={{
            totalTime,
            setTotalTime,
            isBreakActive,
            setIsBreakActive,
        }}
    >
        {children}
    </TimeContext.Provider>
);
}

export const useTimeContext = () => {
    const context = useContext(TimeContext);
    if (context === undefined) {
        throw new Error('useTimeContext must be used within a TimeProvider');
    }
    return context;
};


export default TimeProvider;

