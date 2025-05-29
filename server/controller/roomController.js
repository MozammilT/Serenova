import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import { v2 as cloudinary } from "cloudinary";

// API to create a new Room for Hotel

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

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
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({ success: true, message: "Room created successfully" });
  } catch (err) {
    console.log("Error in createRoom function: ", err);
    res.json({success: false, message: err.message});
  }
};

// API to get all Room

export const getRoom = async () => {};

// API to get all Room for a specific Hotel

export const getOwnerRoom = async () => {};

// API to toggle availability of a Room

export const toggleRoomAvailability = async () => {};
