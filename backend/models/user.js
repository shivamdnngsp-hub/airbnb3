import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters"]
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing"
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
