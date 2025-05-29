import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getRooms,
  getOwnerRoom,
  toggleRoomAvailability,
} from "../controller/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), protect, createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRoom);
roomRouter.post("/toggle-availibility", protect, toggleRoomAvailability);

export default roomRouter;
