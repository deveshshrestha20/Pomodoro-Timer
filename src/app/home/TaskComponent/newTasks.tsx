import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MdOutlineAdd } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const NewTasks: React.FC = () => {
  return (
    <div>
      <Box
        component="section"
        sx={{
          p: 1.5,
          border: "4px dashed #3c313b",
          backgroundColor: "#D8D2C2",
          borderRadius: "10px",
        }}
      >
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 0, width: "25em", height: "3em" } }}
          noValidate
          autoComplete="off"
        >
          <div className="flex items-center ">
            <TextField
              id="standard-basic"
              label="New Task"
              variant="standard"
              margin="none"
              color="info"
              InputLabelProps={{
                sx: {
                  transform: "translate(0, 6px) scale(1)", // Initial label position
                  "&.Mui-focused": {
                    transform: "translate(0, -6px) scale(0.75)", // Position when focused
                  },
                  "&.MuiFormLabel-filled": {
                    transform: "translate(0, -6px) scale(0.75)", // Position when filled
                  },
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
                  padding: "2px 0", // Adjust padding for alignment
                },
                "& .MuiFormLabel-root": {
                  color: "#3c313b",
                },
                "& .Mui-focused .MuiFormLabel-root": {
                  color: "#3c313b",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#3c313b",
                },
              }}
            />
            <div className="relative left-7 top-2">
              <MdOutlineAdd className="text-black w-9 h-9" />
            </div>
            <div className="relative left-9 top-2">
              <MdDeleteOutline className="text-black w-8 h-8" />
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default NewTasks;
