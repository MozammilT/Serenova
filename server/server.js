import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhook from "./controller/clerk-webhook.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";

connectDB();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors());

app.use("/api/webhooks", clerkWebhook);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
