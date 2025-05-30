import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getUserBookings,
  getHotelBooking,
} from "../controller/bookingController.js";

const bookingRoute = express.Router();

bookingRoute.post("/check-availability", checkAvailabilityAPI);
bookingRoute.post("/book", protect, createBooking);
bookingRoute.get("/user", protect, getUserBookings);
bookingRoute.get("/hotel", protect, getHotelBooking);

export default bookingRoute;
