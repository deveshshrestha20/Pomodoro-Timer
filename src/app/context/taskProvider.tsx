"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";


interface Task {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
  }

interface taskContextType {
    value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>,
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskContext = createContext<taskContextType>(null!);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        value,
        setValue,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default TaskProvider;
