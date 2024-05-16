import express from "express";
import {
  userByToken,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../schemas/authSchema.js";
import { authMiddleware } from "../helpers/authmiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerUserSchema),
  userRegistration
);

authRouter.post("/login", validateBody(loginUserSchema), userLogin);

authRouter.post("/logout", authMiddleware, userLogout);

authRouter.get("/current", authMiddleware, userByToken);

export default authRouter;
