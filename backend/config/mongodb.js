import mongoose from "mongoose";
const connectDB = async () => {
    const url = process.env.MONGODB_URI || "mongodb://localhost:27017/userdb";
    if (!url) {
        throw new Error("MongoDB connection URL is not defined");
    }
    try {
        mongoose.connection.on("connected", () => {
            console.log("✅ Connected to MongoDB");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
        await mongoose.connect(url);
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
export default connectDB;