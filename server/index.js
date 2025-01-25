const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { customAlphabet } = require("nanoid");

const PORT = process.env.PORT || 3001;


const path = require("path");


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const server = createServer(app);

// Store Room and their states
const rooms = new Map(); // { roomID: { timerState, users, interval } }
const connectedUsers = new Map(); // { socket.id: roomID }

// Generate custom Room IDs
const nanoid = customAlphabet("4567890abcdef", 6);

const io = new Server(server, {
  cors: {
    origin: "https://group-pomodoro-timer.vercel.app",
    methods: ["GET", "POST"],
  },
});

// Helper: Create Timer State
const createTimerState = (isBreakActive = false) => ({
  totalTime: isBreakActive ? 300 : 1500, // Default: 25 mins (1500s) or 5 mins (300s)
  isActive: false,
  isBreakActive,
  breakTime: 300, // Default break time: 5 mins
});

// Helper: Get room participants
const getRoomParticipants = (roomID) => {
  const room = rooms.get(roomID);
  if (!room) return [];
  
  return Array.from(room.users).map(socketId => {
    const userInfo = connectedUsers.get(socketId);
    return {
      id: socketId,
      name: userInfo?.name || 'Anonymous',
      imageUrl: userInfo?.imageUrl,
      online: true
    };
  });
};

// Handle New Socket Connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user info update
  socket.on("updateUserInfo", ({ name, imageUrl, roomID }) => {
    const userInfo = connectedUsers.get(socket.id) || {};
    connectedUsers.set(socket.id, {
      ...userInfo,
      roomID,
      name,
      imageUrl
    });

    // If user is in a room, broadcast updated participants list
    if (roomID) {
      io.to(roomID).emit("roomUsers", getRoomParticipants(roomID));
    }
  });

  // Create a New Room 
  socket.on("createRoom", () => {
    const roomID = nanoid();

    // Initialize room state
    rooms.set(roomID, {
      timerState: createTimerState(),
      users: new Set(),
      interval: null,
    });

    socket.emit("roomCreated", roomID);
    console.log(`Room created: ${roomID}`);
  });

   // Handle Break State
   socket.on("breakState", (roomID) => {
    if (!roomID) {
      return;
    }

    const room = rooms.get(roomID);
    if (!room) {
      socket.emit("error", "Room not found");
      return;
    }

    // Clear any existing interval
    if (room.interval) {
      clearInterval(room.interval);
      room.interval = null;
    }

    // Update room's timer state for break
    room.timerState = {
      ...room.timerState,
      totalTime: 300, // 5 minutes break
      isActive: false,
      isBreakActive: true
    };

    // Emit the updated state to all users in the room
    io.to(roomID).emit("timerState", {
      totalTime: room.timerState.totalTime,
      isActive: room.timerState.isActive,
      isBreakActive: room.timerState.isBreakActive
    });

    console.log(`Break state activated for room ${roomID}`);
  });


  // Join a Room
  socket.on("joinRoom", (roomID) => {
    const room = rooms.get(roomID);

    if (!room) {
      socket.emit("error", "Room not found");
      return;
    }

    socket.join(roomID);
    room.users.add(socket.id);

     // Update user's room in connectedUsers
     const userInfo = connectedUsers.get(socket.id) || {};
     connectedUsers.set(socket.id, { ...userInfo, roomID });

    // Emit current room state to the user
    socket.emit("timerState", room.timerState);

    // Notify others in the room
    io.to(roomID).emit("roomUsers", getRoomParticipants(roomID));
    io.to(roomID).emit("userCount", room.users.size);

    console.log(`User ${socket.id} joined room ${roomID}`);
  });

  


  // START THE TIMER
  socket.on("startTimer", (roomID) => {
    console.log("Received startTimer request for room:", roomID); // Log the roomID
    const room = rooms.get(roomID);
  
    if (!room) {
      socket.emit("error", "Invalid room ID");
      return;
    }
  
    const { timerState } = room;
  
    // Start the timer if it's not already running
    if (!timerState.isActive) {
      timerState.isActive = true;
  
      // // Emit the initial state to all clients
      // console.log("Emitting initial timerState:", { totalTime: timerState.totalTime, isActive: timerState.isActive });
      io.to(roomID).emit("timerState", {
        totalTime: timerState.totalTime,
        isActive: timerState.isActive,
      });
  
      // Set up interval to decrement time
      room.interval = setInterval(() => {
        if (timerState.totalTime > 0 && timerState.isActive) {
          timerState.totalTime -= 1;
  
          // // Emit updated timer state to all clients
          // console.log("Emitting updated timerState:", { totalTime: timerState.totalTime, isActive: timerState.isActive });
          io.to(roomID).emit("timerState", {
            totalTime: timerState.totalTime,
            isActive: timerState.isActive,
          });
        } else {
          // When timer hits 0, stop the interval and handle state change
          clearInterval(room.interval);
          room.interval = null;
  
          // Toggle break time
          timerState.isActive = false;
          timerState.isBreakActive = !timerState.isBreakActive;
          timerState.totalTime = timerState.isBreakActive ? 300 : 1500; // 5 minutes break or 25 minutes work
  
          // // Emit final timer state and completion event
          // console.log("Timer completed, emitting final timerState and timerComplete");
          io.to(roomID).emit("timerState", {
            totalTime: timerState.totalTime,
            isActive: timerState.isActive,
          });
          io.to(roomID).emit("timerComplete", timerState.isBreakActive);
        }
      }, 1000);
    }
  });
  

  // Pause Timer
  socket.on("pauseTimer", (roomID) => {
    const room = rooms.get(roomID);

    if (!room) return;

    const { timerState } = room;

    timerState.isActive = false;
    if (room.interval) clearInterval(room.interval);
    room.interval = null;

    io.to(roomID).emit("timerState", { ...timerState });
  });

  // Reset Timer
  socket.on("resetTimer", ({roomID, isBreak }) => {
    const room = rooms.get(roomID);

    if (!room) return;


    if (room.interval) clearInterval(room.interval);

    room.timerState = createTimerState(isBreak);
     io.to(roomID).emit("timerState", {
    totalTime: room.timerState.totalTime,
    isActive: room.timerState.isActive,
    isBreakActive: room.timerState.isBreakActive
  });
  });

  // Disconnect from Room
  socket.on("disconnectRoom", (roomID) => {
    const room = rooms.get(roomID);

    if (room) {
      room.users.delete(socket.id);
      connectedUsers.delete(socket.id);

      io.to(roomID).emit("roomUsers", getRoomParticipants(roomID));
      io.to(roomID).emit("userCount", room.users.size);

      //lEAVE THE SOCKET ROOM 
      socket.leave(roomID)

      if (room.users.size === 0) {
        if (room.interval) clearInterval(room.interval);
        rooms.delete(roomID);
        console.log(`Room ${roomID} deleted because it's empty.`);
      }
    }

    
    console.log(`User ${socket.id} disconnected from room ${roomID}`);
  });

  // Handle User Disconnection
  socket.on("disconnect", () => {
    const roomID = connectedUsers.get(socket.id)?.roomID;
  
    if (roomID) {
      const room = rooms.get(roomID);
  
      if (room) {
        room.users.delete(socket.id);
        // Emit updated participants list and user count
        io.to(roomID).emit("roomUsers", getRoomParticipants(roomID));
        io.to(roomID).emit("userCount", room.users.size);
  
        if (room.users.size === 0) {
          if (room.interval) clearInterval(room.interval);
          rooms.delete(roomID);
          console.log(`Room ${roomID} cleaned up because it's empty.`);
        }
      }
  
      connectedUsers.delete(socket.id);
    }
  
    console.log("A user disconnected:", socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this route to handle the root path
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});