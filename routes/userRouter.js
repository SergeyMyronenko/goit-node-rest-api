import express from "express";
import { userAvatar } from "../controllers/usersController.js";
import userMiddleware from "../helpers/upload.js";

const userRouter = express.Router();

userRouter.patch("/avatar", userMiddleware.single("avatar"), userAvatar);

export default userRouter;
