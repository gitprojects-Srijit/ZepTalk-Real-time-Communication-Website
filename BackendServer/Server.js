import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./Lib/db.js";
import { Server } from "socket.io";
import userRouter from "./Routes/UserRoutes.js";
import messageRouter from "./Routes/MessageRoutes.js";

// create HTTP and Express server
const app = express();
const server = http.createServer(app); // for socket.io web server uses

// initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//store online users data for real time chat
export const onlineUsersMap = {}; // {userId : SocketId}

// socket.io connection event
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("a new client connected", userId);

  if (userId) onlineUsersMap[userId] = socket.id;

  // emit event to all connected clients
  io.emit("getOnlineUsers", Object.keys(onlineUsersMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete onlineUsersMap[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsersMap));
  });
});

// Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(cors());

//Routes setup
app.use("/api/status", (req, res) => {
  res.send("Server is live");
});
app.use("/api/Auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDb
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT :" + PORT));
