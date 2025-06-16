import express from 'express';
import { protectRoute } from '../Middleware/Authenticate.js';
import { getMessages, getUsersForSidebar, markMessageSeenById, sendMessage } from '../Controllers/MessageController.js';

const messageRouter = express.Router(); 

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageSeenById);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter; 