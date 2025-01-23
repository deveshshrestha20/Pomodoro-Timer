import React from "react";
import { FcTodoList } from "react-icons/fc";
import NewTasks from "./newTasks";

const Tasks: React.FC = () => {
  return (
    <div>
      <div className="h-11 w-[30rem] bg-clockground flex items-center justify-center rounded-lg">
        <div className="flex items-center  space-x-2">
          <FcTodoList className="h-9 w-7" />
          <button className="text-background text-2xl text-center font-medium">
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
