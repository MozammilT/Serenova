import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhook from "./controller/clerk-webhook.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRoute from "./routes/bookingsRoute.js";
import emailRoute from "./routes/emailRoute.js";
import connectCloudinary from "./config/cloudinary.js";

connectDB();
connectCloudinary();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://serenova-gamma.vercel.app"], // Add your frontend URL
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.use("/api/webhooks", clerkWebhook);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRoute);
app.use("/api/email", emailRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
