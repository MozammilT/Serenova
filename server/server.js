import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import clerkWebhooks from "./controller/clerk-webhook.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(cors());

// Webhook endpoint - must come before JSON body parser
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }), // Use express.raw instead of bodyParser
  clerkWebhooks
);

// Regular middleware for other routes
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Backend Server is running successfully");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
