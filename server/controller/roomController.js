import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import { v2 as cloudinary } from "cloudinary";

// API to create a new Room for Hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth().userId });

    if (!hotel) return res.json({ sucess: false, message: "No Hotel found" });

    //Upload Images to Cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    //Wait for all Images to upload
    const images = await Promise.all(uploadImages);

    //Add the Room data to database
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight,
      amenities,
      images,
    });
    res.json({ success: true, message: "Room created successfully" });
  } catch (err) {
    console.error("Error in createRoom function: ", err);
    res.json({ success: false, message: err.message });
  }
};

// API to get all Room
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (err) {
    console.error("Error in getRoom function:", err);
    res.json({ success: false, message: err.message });
  }
};

// API to get all Room for a specific Hotel
export const getOwnerRoom = async (req, res) => {
  try {
    const hotelData = await Hotel({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    res.json({ success: true, rooms });
  } catch (err) {
    console.error("Error in getOwnerRoom function:", err);
    res.json({ success: false, message: err.message });
  }
};

// API to toggle availability of a Room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability updated" });
  } catch (err) {
    console.error("Error in toggleRoomAvailability function:", err);
    res.json({ success: false, message: err.message });
  }
};
