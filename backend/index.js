import dotenv from "dotenv";
dotenv.config();   

import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import listingRouter from "./routers/lisitingRouter.js";
import favsRouter from "./routers/favRouter.js";
import searchingRouter from "./routers/searching.js";
import bookingRouter from "./routers/bookingRouter.js";

const app = express();


const port = process.env.PORT;
console.log("ENV TEST:", process.env.CLOUDINARY_NAME);

app.set("trust proxy", 1);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://airbnb3.vercel.app",
    "https://airbnb3-beta.vercel.app"
  ],
  credentials: true
}));


app.use(express.static("public"))
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("hello from server");
});



app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/favs", favsRouter);
app.use("/api/search", searchingRouter)
app.use("/api/booking", bookingRouter)

app.listen(port, () => {
  connectDb();
  console.log(`Server running on http://localhost:${port}`);
});
