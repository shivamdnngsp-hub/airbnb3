import User from "../models/user.js";

export const fetchUser = async (req, res) => {
  try {
    const foundUser = await User
      .findById(req.userId)
      .select("-password");

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(foundUser);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
