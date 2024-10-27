import React from 'react';
import { Rowdies } from 'next/font/google';

const rowdies = Rowdies({
  weight: '300', // Slightly bold
  subsets: ['latin'],
  display: 'swap',
});

const Home = () => {
  return (
    <div className="absolute inset-0 m-auto flex items-center justify-center h-[32rem] w-[42rem] rounded-3xl shadow-xl p-3">
      <div className="relative h-full w-full bg-insidebg opacity-35 rounded-3xl" />
      <div className="absolute inset-0 top-7 left-12 text-black flex justify-between w-[80%] px-4">
        {/* Pomodoro Timer */}
        <div className="h-9 w-80 bg-foreground bg-opacity-20 rounded-lg m-2">
          <h1 className={`${rowdies.className} text-xl text-center p-2`}>
            Pomodoro Timer
          </h1>
        </div>
        
        {/* Break */}
        <div className="h-9 w-80 bg-foreground bg-opacity-20 rounded-lg m-2">
          <h1 className={`${rowdies.className} text-xl text-center p-2`}>
            Break
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
