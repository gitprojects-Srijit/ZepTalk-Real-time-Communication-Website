import express from 'express';
import { checkAuth, login, signup, updateProfile } from '../Controllers/UserController.js';
import { protectRoute } from '../Middleware/Authenticate.js';

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;