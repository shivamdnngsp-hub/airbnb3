import express from "express"
import { addFav, fetchWishlist, removeFav } from "../controllers/favsController.js";
import protect from "../middleware/isAuth.js";

const favsRouter = express.Router();

favsRouter.post("/addfav", protect, addFav)
favsRouter.get("/getfav", protect, fetchWishlist)
favsRouter.post("/removefav", removeFav)
export default favsRouter
