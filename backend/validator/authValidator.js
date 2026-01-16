import { body } from "express-validator"

export const signupValidator = [

  body("userName").trim().notEmpty().withMessage("User's name is required")
    .isLength({ min: 3 }).withMessage("User name must be of atlest 3 characters"),

  body("email").trim().notEmpty().withMessage("Email required")
    .isEmail().withMessage("Email not valid "),

  body("password").notEmpty().withMessage("password required")
    .isLength({ min: 5 }).withMessage("Password must be of atlest 5 characters")

]

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email required")
    .isEmail().withMessage("Invalid email"),

  body("password")
    .notEmpty().withMessage("Password required"),
];