const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let timerState = {
  totalTime: 1500,
  isActive: false,
  isBreakActive: false,
  breakTime: 300,
};

let interval = null;

io.on("connection", (socket) => {
  console.log("A user connected");
  
  // Send current state to newly connected client
  socket.emit("timerState", timerState);

  socket.on("startTimer", () => {
    if (!timerState.isActive) {
      timerState.isActive = true;
      io.emit("timerState", timerState);
      
      // Clear any existing interval
      if (interval) clearInterval(interval);
      
      interval = setInterval(() => {
        if (timerState.totalTime > 0 && timerState.isActive) {
          timerState.totalTime -= 1;
          io.emit("timerState", timerState);
        } else {
          if (interval) clearInterval(interval);
          timerState.isActive = false;
          io.emit("timerState", timerState);

          // Change the mode instantly from timer to break immediately after the pomodoro ends and break starts
          timerState.isBreakActive = !timerState.isBreakActive;
          timerState.totalTime = timerState.isBreakActive ? timerState.breakTime : timerState.totalTime; 

          io.emit("timerState", timerState);
          io.emit("timerComplete", timerState.isBreakActive);


        }
      }, 1000);
    }
  });

  socket.on("pauseTimer", () => {
    timerState.isActive = false;
    if (interval) clearInterval(interval);
    io.emit("timerState", timerState);
  });

  socket.on("resetTimer", (isBreakActive) => {
    if (interval) clearInterval(interval);
    timerState = {
      totalTime: isBreakActive ? 300 : 1500,
      isActive: false,
      isBreakActive,
      breakTime: 300,
    };
    io.emit("timerState", timerState);
  });

  socket.on("breakState", ()=> {
    if(interval) clearInterval(interval);

    timerState = {
      totalTime: 300,
      isActive: false,
      isBreakActive: true,
      breakTime: 300,
    };
    io.emit("timerState", timerState)
    
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});