import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    guests: {
        adults: { type: Number, required: true },
        children: { type: Number, default: 0 },
        infants: { type: Number, default: 0 }
    },

    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})
const Booking = mongoose.model("Booking", bookingSchema)
export default Booking;