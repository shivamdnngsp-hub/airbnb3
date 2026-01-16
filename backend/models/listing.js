import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        lat: {
            type: Number
        },

        lng: {
            type: Number
        },

        photos: {
            type: [String],
            required: true
        },

        category: {
            type: String,
            required: true
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    }
)
const Listing = mongoose.model("Listing", listingSchema);
export default Listing;