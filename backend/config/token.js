import jwt from "jsonwebtoken";

const gentoken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default gentoken;
