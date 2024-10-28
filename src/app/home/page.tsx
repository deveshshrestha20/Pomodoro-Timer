import React from 'react';
import { Rowdies } from 'next/font/google';
import CountdownTimer from './countdownTimer';

const rowdies = Rowdies({
  weight: '300', // Slightly bold
  subsets: ['latin'],
  display: 'swap',
});



const Home = () => {
  return (
    <div className="absolute inset-0 m-auto flex items-center justify-center h-[32rem] w-[42rem] rounded-3xl shadow-xl p-3">
      <div className="relative h-full w-full bg-insidebg opacity-35 rounded-3xl" />
      <div className="absolute inset-0 top-7 left-12 text-black flex justify-between  w-[80%] px-4">
        {/* Pomodoro Timer */}
        <div className="h-10 w-80 bg-foreground bg-opacity-20 rounded-md m-2">
          <h1 className={`${rowdies.className} text-2xl   text-center p-1 text-clockground `}>
            Pomodoro Timer
          </h1>
        </div>
        
        {/* Break */}
        <div className="h-10 w-80 bg-foreground bg-opacity-20 rounded-md m-2">
          <h1 className={`${rowdies.className} text-2xl text-clockground text-center p-1`}>
            Break
          </h1>
        </div>
      <div className='absolute top-28 left-12'>
      <CountdownTimer/>
      </div>
        
      </div>
      
      
    </div>
  );
};

export default Home;
