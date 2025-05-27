import mongoose from "mongoose";

const connectDB = async () => {
  const db = mongoose.connection;
  db.on("connected", () => {
    console.log("✅ MongoDB database connected");
  });
  db.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });
  db.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
  });
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
