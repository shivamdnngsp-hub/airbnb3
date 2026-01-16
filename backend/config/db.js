import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected");
    } catch (err) {
        console.log("error in connection to db")
    }
}
export default connectDb;