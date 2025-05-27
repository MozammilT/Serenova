import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import clerkWebhooks from "./controller/clerkWebhook.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(cors());

//Middleware
app.use(express.json());
app.use(clerkMiddleware());

//API to listen for Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
  res.send("Backend Server is running successfully");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
