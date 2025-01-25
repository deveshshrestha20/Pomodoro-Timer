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
    <div className="relative h-screen w-screen flex flex-col">
  <PomodoroSidebar/>
  
  <div className="
    absolute 
    top-4 
    right-0 
    sm:right-28 
    md:right-32 
    lg:right-36 
    xl:right-40 
    2xl:right-44
  ">
    <Profile />
  </div>

  <div className="
    absolute 
    top-70 
   
    2xl:left-[31rem]
    lg:max-2xl:left-[28rem]
    xl:max-lg:left-[32rem]
    w-full 
    max-w-[90%]
    sm:max-w-[80%] 
    md:max-w-[70%] 
    lg:max-w-[60%]
  ">
    <CreateRoom/>
  </div>
      

      <div className="absolute top-40 left-[3rem] xl:left-[5rem] 2xl:left-[7rem] text-md">
        <Tasks />
      </div>

      

      <div className="absolute top-36 left-[55rem] 2xl:left-[47rem] xl:left-[40rem] lg:left-[34rem] flex items-center justify-center h-[32rem] w-[42rem] rounded-3xl shadow-xl p-3">
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