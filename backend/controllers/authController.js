import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";
import User from "../models/user.js";

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password || password.trim().length < 5) {
      return res.status(400).json({
        message: "Password must be at least 5 characters long"
      });
    }




    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });



    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });

  } catch (err) {
    return res.status(500).json({ message: "Error in signup" });
  }
}



export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(userExist._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: userExist._id,
        userName: userExist.userName,
        email: userExist.email,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server side error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });



    return res.status(200).json({
      message: "User registered successfully",
    });


  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};


