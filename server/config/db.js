import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });
    db.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
    db.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });
    
    await mongoose.connect(`${process.env.MONGODB_URI}/serenova`)
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
