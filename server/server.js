import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controller/clerkWebhook.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(cors()); //Enable Cross-Origin Resource Sharing

//Middleware
app.use(clerkMiddleware());
app.use(express.json());

// API to listen to Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);


//             ROUTES         //

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
