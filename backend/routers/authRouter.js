import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { signupValidator, loginValidator } from "../validator/authValidator.js"
import { validate } from "../middleware/validate.js";

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, validate, signup);
authRouter.post("/login", loginValidator, validate, login);

authRouter.post("/logout", logout)
export default authRouter;
