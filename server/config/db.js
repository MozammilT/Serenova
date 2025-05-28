import mongoose from "mongoose";

const connectDB = async () => {
  try {
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

    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(
      "MongoDB connected to database:",
      mongoose.connection.db.databaseName
    );
  } catch (err) {
    console.error("❌ Initial MongoDB connection error:", err.message);
  }
};

export default connectDB;
