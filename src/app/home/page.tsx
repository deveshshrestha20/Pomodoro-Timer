import React from 'react';
import CountdownTimer from './countdownTimer';
import Break from './break';
import PomodoroTimer from './pomodoroTimer';





const Home = () => {
  return (
    <div className="absolute inset-0 m-auto flex items-center justify-center h-[32rem] w-[42rem] rounded-3xl shadow-xl p-3">
      <div className="relative h-full w-full bg-insidebg opacity-35 rounded-3xl" />
      <div className="absolute inset-0 top-7 left-12 text-black flex justify-between  w-[80%] px-4">
        <PomodoroTimer/>
        <Break/>
      <div className='absolute top-28 left-12'>
      <CountdownTimer/>
      </div>
        
      </div>
      
      
    </div>
  );
};

export default Home;
