import Booking from "../models/bookings.js";
import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import { bookingConfirmation } from "./emailController.js";

//Function to Check the Availability of room (with Database)
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const existingBookings = await Booking.find({
      room,
      status: { $ne: "Cancelled" },
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate },
        },
      ],
    }).exec();
    const isAvailable = existingBookings.length === 0;
    return isAvailable;
  } catch (err) {
    console.error("Error in checkAvailability function: ", err);
    throw err;
  }
};

//API to check the Availability of a room (sending data to frontend)
//? Route - post => /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    if (!room || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Missing fields required",
      });
    }

    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });

    res.status(200).json({ success: true, isAvailable });
  } catch (err) {
    console.log("Error in checkAvailabilityAPI function: ", err);
    res.status(500).json({
      success: false,
      message: "Failed to check the availability of room",
    });
  }
};

//API to create a new booking
//? Route - post => /api/bookings/book

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    console.log("[createBooking] Received booking request:", {
      user,
      room,
      checkInDate,
      checkOutDate,
      guests,
    });

    //Check availability of the room before booking
    const isAvailable = await checkAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    console.log("[createBooking] Room availability:", isAvailable);

    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Room is not avalable" });
    }

    //Get the pricePerNight of the room
    const roomData = await Room.findById(room).populate("hotel");
    console.log("[createBooking] roomData:", roomData);
    if (!roomData) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    const pricePerNight = roomData.pricePerNight;

    //Calculate the total price the booking (pricePerNight * No. of Days of stay)
    const checkIn = new Date(checkInDate);
    console.log("checkIn: ", checkIn);
    const checkOut = new Date(checkOutDate);
    console.log("checkOut: ", checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    console.log("timeDiff: ", timeDiff);
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log("nights: ", nights);
    const totalPrice = pricePerNight * nights;
    console.log("Total Price: ", totalPrice);

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      totalPrice,
      guests,
    });
    console.log("[createBooking] Booking created: ", booking);
    res
      .status(201)
      .json({ success: true, message: "Booking created successfully" });

    // Send booking confirmation email
    try {
      await bookingConfirmation({
        email: req.user.email,
        user: req.user,
        bookingDetails: {
          hotelName: roomData.hotel.name,
          roomType: roomData.roomType,
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
          guests,
          totalPrice,
        },
      });
      console.log("Confirmation email sent to: ", req.user.email);
    } catch (emailErr) {
      console.error("Failed to send booking confirmation email:", emailErr);
    }
  } catch (err) {
    console.error("Error in createbookign function: ", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create booking" });
  }
};

//API to get all bookings for a User
//? Route - GET => /api/booking/user

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    console.log("[getUserBooking] All bookings fetched for user: ", user);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error("Error in getUserBookings function: ", err);
    res
      .status(500)
      .json({ succes: false, message: "Failed to get the user bookings" });
  }
};

//API to get all bookings for a particular hotel
//? Route - GET => /api/bookings/hotel

export const getHotelBooking = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth().userId });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "No hotel found" });
    }
    console.log("[getHotelBooking] Hotel found:", hotel);

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("user room hotel")
      .sort({ createdAt: -1 });
    console.log("[getHotelBooking] Bookings found:", bookings);

    //Number of total bookings done in this hotel
    const totalBookings = bookings.length;
    console.log("[getHotelBooking] Total bookings:", totalBookings);

    //Total revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    console.log("[getHotelBooking] Total revenue:", totalRevenue);

    console.log(
      `[getHotelBooking] All bookings for hotel ${hotel} fetched successfully`
    );
    res.status(200).json({
      success: true,
      dashBoardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (err) {
    console.error("Error in getHotelBooking function: ", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
};
