import express from "express"
import protect from "../middleware/isAuth.js";
import { addBooking, cancelBooking, myBookings } from "../controllers/bookingController.js";
import { bookingValidator } from "../validator/bookingValidator.js";
import { validate } from "../middleware/validate.js";
const bookingRouter = express.Router();

bookingRouter.post("/addbooking", bookingValidator, validate, protect, addBooking)
bookingRouter.get("/mybooking", protect, myBookings)
bookingRouter.post("/cancelbooking", protect, cancelBooking)
export default bookingRouter