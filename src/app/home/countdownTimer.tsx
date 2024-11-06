/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState,useEffect } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { useTimeContext } from "../context/breakTimeProvider";


const CountdownTimer: React.FC = ({  }) => {
    const {totalTime, setTotalTime} = useTimeContext();
    
    

    const {isBreakActive, setIsStartRunning, isActive, setIsActive, isFinished, setIsFinished} = useTimeContext();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, setTotalTime, totalTime]);

    const handleStart = () => {
        setIsActive(true); //State indicating the timer is started and active 
        setIsStartRunning(true); // For  indicating that the start button is running 
        
    };

    const handlePause = () => {
        setIsActive(false); //State indicating the timer is not active
        setIsStartRunning(false); // For indicating that the start button is not running 
        
    };

    const handleReset = () => {
        if(isBreakActive=== true) { //State for knowing if the break button is clicked
            setTotalTime(300); //Break time
            setIsActive(false); // the timer is not active
            setIsStartRunning(false); // start button is not running 
            
        }
         else { // timer mai huda kheri reset button thichyo bhane conditions 
         // Break thichda kheri matra isBreakActive true hunxha nabhaye aru bela false state ma basxha
        setTotalTime(1500); // Pomdoro timer 
        setIsActive(false); // the timer is not active
        setIsStartRunning(false);
        
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
