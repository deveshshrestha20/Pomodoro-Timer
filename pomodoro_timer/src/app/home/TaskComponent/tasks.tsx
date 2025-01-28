import React from "react";
import { FcTodoList } from "react-icons/fc";
import NewTasks from "./newTasks";

const Tasks: React.FC = () => {
  return (
    <div className="w-full px-2 sm:px-4 flex flex-col items-center">
      {/* Header Section */}
      <div
        className="
          h-8 
          sm:h-10 
          md:h-12 
          lg:h-14 
          w-full 
          max-w-[390px] 
          bg-clockground 
          flex 
          items-center 
          justify-center 
          rounded-lg 
          mx-auto
        "
      >
        <div className="flex items-center space-x-2">
          {/* Icon */}
          <FcTodoList className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          {/* Button */}
          <button
            className="
              text-background 
              text-base 
              sm:text-lg 
              md:text-xl 
              lg:text-2xl 
              text-center 
              font-medium
            "
          >
            Tasks
          </button>
        </div>
      </div>

      {/* NewTasks Section */}
      <div className="pt-2 w-full max-w-[390px] mx-auto">
        <NewTasks />
      </div>
    </div>
  );
};

export default Tasks;