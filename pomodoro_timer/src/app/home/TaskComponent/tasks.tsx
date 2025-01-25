import React from "react"; 
import { FcTodoList } from "react-icons/fc"; 
import NewTasks from "./newTasks";  

const Tasks: React.FC = () => {   
  return (     
    <div className="w-full">
      <div className="
        h-11 
        w-full 
        max-w-[30rem] 
        bg-clockground 
        flex 
        items-center 
        justify-center 
        rounded-lg 
        mx-auto
      ">
        <div className="flex items-center space-x-2">
          <FcTodoList className="h-7 w-5 sm:h-9 sm:w-7" />
          <button className="
            text-background 
            text-xl 
            sm:text-2xl 
            text-center 
            font-medium
          ">
            Tasks
          </button>
        </div>
      </div>
      <div className="pt-2">
        <NewTasks />
      </div>
    </div>   
  ); 
};  

export default Tasks;