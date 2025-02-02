// "use client";
import React from "react";
import CountdownTimer from "./countdownTimer";
import Break from "./break";
import PomodoroTimer from "./pomodoroTimer";
import Profile from "./profile";
import Tasks from "./TaskComponent/tasks";
import CreateRoom from "./RoomComponent/createRoom";

import PomodoroSidebar from "./sideBar/sideBar";


const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <PomodoroSidebar />

      {/* Profile */}
      <div className="absolute top-4 right-4 sm:right-28 md:right-32 lg:right-36 xl:right-40 2xl:right-44">
        <Profile />
      </div> 

      <div className="absolute top-70 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
        <CreateRoom />
      </div>


      {/* Tasks */}
<div className="absolute top-10 sm:top-20 md:top-30 lg:top-40 left-2 sm:left-2 md:left-4 lg:left-6 xl:left-10 2xl:left-14 text-sm sm:text-md md:text-lg">
  <Tasks />
</div>

      {/* Timer Section */}
<div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[42rem] h-[32rem] rounded-3xl shadow-xl p-3">
  <div className="relative h-full w-full bg-insidebg opacity-35 rounded-3xl" />
  <div className="absolute inset-0 top-7 left-14 text-black flex justify-between w-[80%] px-4">
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