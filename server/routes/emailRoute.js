import express from "express";
import { sendWelcomeEmail } from "../controller/emailController.js";

const emailRoute = express.Router();

emailRoute.post("/send", sendWelcomeEmail);

export default emailRoute;
