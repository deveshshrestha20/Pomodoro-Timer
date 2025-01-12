// "use client";
import React from "react";
import CountdownTimer from "./countdownTimer";
import Break from "./break";
import PomodoroTimer from "./pomodoroTimer";
import Profile from "./profile";
import Tasks from "./TaskComponent/tasks";


const Home: React.FC = () => {

  return (
    <div className="relative h-screen w-screen">
       <div className={"absolute top-[5.6rem] left-[91rem] "}>
        <Profile />
      </div>

      <div className="absolute top-40 left-[8rem] text-md">
        <Tasks />
      </div>

      <div className="absolute top-36 left-[47rem] flex items-center justify-center h-[32rem] w-[42rem] rounded-3xl shadow-xl p-3">
        <div className="relative h-full w-full bg-insidebg opacity-35 rounded-3xl" />
        <div className="absolute inset-0 top-7 left-12 text-black flex justify-between w-[80%] px-4">
          <PomodoroTimer />
          <Break />
          <div className="absolute top-28 left-12">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;