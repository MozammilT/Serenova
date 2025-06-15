import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel, getAllHotel } from "../controller/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, registerHotel);
hotelRouter.get("/", getAllHotel);

export default hotelRouter;
