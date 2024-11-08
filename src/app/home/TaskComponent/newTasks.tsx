"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MdDeleteOutline, MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import { useTaskContext } from "@/app/context/taskProvider";
import { v4 as uuidv4 } from "uuid";

const NewTasks: React.FC = () => {
  const { value, setValue, tasks, setTasks } = useTaskContext();
  const [editableText, setEditableText] = React.useState("");
  const editFieldRef = React.useRef<{ [key: string]: HTMLInputElement | null }>({});

  const addTask = (todo: string) => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ]);
    setValue("");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (value.trim()) {
      addTask(value);
    } else {
      console.log("The input field is empty.");
    }
  };

  const handleDeleteClick = (taskID: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID));
  };

  const handleEditClick = (taskID: string, currentTaskText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskID ? { ...task, isEditing: true } : task
      )
    );
    setEditableText(currentTaskText);

    // Focus the input field after setting it to edit mode
    setTimeout(() => {
      editFieldRef.current[taskID]?.focus();
    }, 0);
  };

  const handleSaveClick = (taskID: string) => {
    if (editableText.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskID
            ? { ...task, task: editableText, isEditing: false }
            : task
        )
      );
    } else {
      console.log("Edited text is empty.");
    }
  };

  return (
    <div>
      <Box
        component="section"
        className="p-4 border-4 border-dashed border-[#3c313b] bg-[#D8D2C2] rounded-xl w-full flex flex-col items-start gap-2"
        style={{
          width: "420px",
          maxHeight: "380px",
          height: tasks.length > 0 ? `${160 + tasks.length * 37}px` : "90px",
          overflowY: tasks.length * 50 > 300 ? "auto" : "hidden",
        }}
      >
        <div className="flex items-center mb-2">
          <TextField
            id="standard-basic"
            label="Add New Task"
            variant="standard"
            margin="none"
            color="info"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            InputLabelProps={{
              sx: {
                color: "#3c313b",
                "&.Mui-focused": { color: "#3c313b" },
                "&.MuiFormLabel-filled": { color: "#3c313b" },
              },
            }}
            sx={{
              width: "38ch",
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
                borderBottomWidth: "2px",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#3c313b",
                borderBottomWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: "#3c313b",
                padding: "1px 0",
              },
            }}
          />
          <div onClick={handleSubmit} className="relative left-9 top-2 cursor-pointer">
            <MdOutlineAdd className="text-black w-11 h-10" />
          </div>
        </div>

        <div className="w-full mt-1">
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <div className="flex items-center">
                  {task.isEditing ? (
                    <TextField
                      value={editableText}
                      variant="outlined"
                      size="small"
                      onChange={(e) => setEditableText(e.target.value)}
                      onBlur={() => handleSaveClick(task.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveClick(task.id);
                        }
                      }}
                      inputRef={(input) => (editFieldRef.current[task.id] = input)}
                      sx={{ width: "23.7em", marginBottom: "0.5em", marginTop: "0.2em" }}
                    />
                  ) : (
                    <TextField
                      value={task.task}
                      variant="outlined"
                      size="small"
                      sx={{ width: "23.7em", marginBottom: "0.5em", marginTop: "0.2em" }}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                  <div className="cursor-pointer" onClick={() => handleDeleteClick(task.id)}>
                    <MdDeleteOutline aria-label="Delete Task" className="text-black w-8 h-8" />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEditClick(task.id, task.task)}
                  >
                    <MdOutlineEdit className="text-black w-8 h-8" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </div>
  );
};

export default NewTasks;
