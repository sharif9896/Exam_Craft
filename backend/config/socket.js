import { Server } from 'socket.io';
import http from 'http';
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};


// Memory store for online users: { "userId": Set(["socketId1", "socketId2"]) }
const onlineUsers = new Map();

export const getRecieverSocketId = (recievedId) => {
    return userSocketMap[recievedId];
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // FIXED: Changed event name from "getOnelineUser" to "getOnlineUsers" 
    // to match what your AppContext is listening for.
    // io.emit("getOnlineUsers", Object.keys(userSocketMap));

      if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
    // First tab opened: User officially "Online"
    io.emit('user_status', { userId, status: 'online' });
  }
  onlineUsers.get(userId).add(socket.id);

  console.log(`User ${userId} connected with socket ${socket.id}`);

  // 2. Handle Disconnection
  socket.on('disconnect', () => {
    const userSockets = onlineUsers.get(userId);
    
    if (userSockets) {
      userSockets.delete(socket.id);
      
      // If no sockets left, user has closed all tabs
      if (userSockets.size === 0) {
        onlineUsers.delete(userId);
        io.emit('user_status', { userId, status: 'offline' });
        
        // Optional: Update MongoDB status
        // await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: Date.now() });
      }
    }
  });

  // 3. Provide "Who is online?" list to the new connection
  socket.emit('online_list', Array.from(onlineUsers.keys()));

    if (userId && userId !== "undefined") {
        socket.join(userId);
    }

    socket.on("typing", (data) => {
        if (data.chatId) {
            socket.to(data.chatId).emit("userTyping", {
                chatId: data.chatId,
                userId: data.userId
            });
        }
    });

    socket.on("stopTyping", (data) => {
        if (data.chatId) {
            socket.to(data.chatId).emit("userStoppedTyping", {
                chatId: data.chatId,
                userId: data.userId
            });
        }
    });

    socket.on("joinChat", (chatId) => {
        if (chatId) {
            socket.join(chatId);
        }
    });

    socket.on("leaveChat", (chatId) => {
        if (chatId) {
            socket.leave(chatId);
        }
    });

    socket.on("disconnect", () => {
        if (userId) {
            delete userSocketMap[userId];
            // FIXED: Sync event name here too
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, server, io };