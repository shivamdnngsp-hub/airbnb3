import Booking from "../models/booking.js";
import Listing from "../models/listing.js";

export const addBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate, guests, id } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start and end dates are required" });
    }

    if (!guests || guests.adults < 1) {
      return res.status(400).json({ message: "At least one adult required" });
    }


    const overLapDates = await Booking.findOne({
      listingId: id,
      startDate: { $lt: endDate },
      endDate: { $gt: startDate },
    });

    if (overLapDates) {
      return res.status(409).json({
        message: "These dates are already booked",
      });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        message: "End date must be after start date"
      });
    }


    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);


    const nights = Math.max(
      Math.ceil((end - start) / MS_PER_DAY),
      1
    );


    const listing = await Listing.findById(id);

    if (!listing || typeof listing.price !== "number") {
      return res.status(404).json({ message: "Listing price not found" });
    }

    const totalPrice = nights * listing.price;


    const newBooking = await Booking.create({
      user: userId,
      listingId: id,
      startDate,
      endDate,
      guests,
      totalPrice,
    });

    return res.status(201).json({
      newBooking,
      message: "Booked successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in booking", success: false });
  }
};

export const myBookings = async (req, res, next) => {
  try {

    const userId = req.userId
    const myBookings = await Booking.find({ user: userId }).populate("listingId")
    return res.status(201).json(myBookings)

  } catch (error) {
    return res.status(500).json({ message: "server error in fetching your bookings" })
  }


}



export const cancelBooking = async (req, res) => {
  try {

    const { bookingId } = req.body;
    const userId = req.userId;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID required" });
    }



    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or not authorized",
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    return res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error in cancelling booking",
    });
  }
};
