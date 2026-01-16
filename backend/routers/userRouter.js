import express from "express";
import { fetchUser } from "../controllers/userController.js";
import protect from "../middleware/isAuth.js";
const userRouter = express.Router();

userRouter.get("/me", protect, fetchUser)

export default userRouter