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
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "Serenova"
    });
    console.log(
      "MongoDB connected to database:",
      mongoose.connection.db.databaseName
    );
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
