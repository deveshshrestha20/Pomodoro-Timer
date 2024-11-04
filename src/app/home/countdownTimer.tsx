/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState,useEffect } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { useTimeContext } from "../context/breakTimeProvider";


const CountdownTimer: React.FC = ({  }) => {
    const {totalTime, setTotalTime} = useTimeContext();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const initTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | undefined;
        if (isActive && totalTime > 0) {
            timerInterval = setInterval(() => {
                setTotalTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerInterval);
                        setIsFinished(true);
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
        };
    }, [isActive, setTotalTime, totalTime]);

    const handleStart = () => {
        setIsActive(true);
        setIsFinished(false);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setTotalTime(1500);
        setIsActive(false);
        setIsFinished(false);
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
                        className=" h-10 w-56 rounded-lg flex items-center justify-center bg-[#564f56]"
                    >
                        <IoPlayOutline className="h-9 w-8 text-white "   />
                    </button>
                )}
                {isActive && (
                    <button
                        onClick={handlePause}
                        className=" h-10 w-56 rounded-lg flex items-center justify-center bg-[#564f56]"
                    >
                        <CiPause1 className="h-7 w-8 text-white " />
                    </button>
                )}
                <button
                    onClick={handleReset}
                    className=" h-10 w-56 rounded-lg flex items-center justify-center bg-[#564f56]"
                >
                    <VscDebugRestart className="h-7 w-14 text-white" />
                </button>
            </div>
        </div>
    );
};

export default CountdownTimer;
