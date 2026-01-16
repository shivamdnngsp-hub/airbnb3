import mongoose from "mongoose";

const favsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    Listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    }

})


const Favs = mongoose.model("Favs", favsSchema);
export default Favs;