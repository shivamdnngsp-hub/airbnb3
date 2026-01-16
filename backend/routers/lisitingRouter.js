import express from "express"
import { AddListing, deleteListing, editListing, getCatListing, getDetails, getlisting, myListings } from "../controllers/listingController.js";
import protect from "../middleware/isAuth.js";
import upload from "../config/multer.js";

const listingRouter = express.Router();
listingRouter.post("/addListing",protect,upload.array("photos", 10),AddListing);


listingRouter.get("/getlisting", getlisting)
listingRouter.get("/details/:id", getDetails)
listingRouter.get("/category/:cat", getCatListing)
listingRouter.get("/mylistings", protect, myListings)
listingRouter.put("/edit/:id", protect, upload.array("photos", 10), editListing)
listingRouter.delete("/delete/:id",protect , deleteListing)
export default listingRouter