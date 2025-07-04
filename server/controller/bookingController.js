import Booking from "../models/bookings.js";
import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import { cancelConfirmation, bookingConfirmation } from "./emailController.js";
import mongoose from "mongoose";
import Stripe from "stripe";

//Function to Check the Availability of room (with Database)
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    console.log("[checkAvailability] Checking availability for Room ID:", room);
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
    const isBookingAvailable = existingBookings.length === 0;
    console.log("[checkAvailability] isBookingAvailable:", isBookingAvailable);

    const roomData = await Room.findById(room);
    if (!roomData) {
      console.warn("[checkAvailability] Room not found for ID:", room);
      return false;
    }
    const roomAvailable =
      roomData.isAvailable === "true" || roomData.isAvailable === true;
    console.log(
      "[checkAvailability] Room isAvailable field:",
      roomData.isAvailable
    );
    console.log("[checkAvailability] roomAvailable:", roomAvailable);

    return isBookingAvailable && roomAvailable;
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
    const getAddressTillCity = (fullAddress) => {
      // Split by comma
      const parts = fullAddress.split(",");

      // If the last part includes "India", drop it
      if (parts[parts.length - 1].trim().toLowerCase() === "india") {
        parts.pop(); // remove "India"
      }

      // Rejoin the rest
      return parts.join(",").trim();
    };

    const trimmedAddress = getAddressTillCity(roomData.hotel.address);

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
        username: req.user.username,
        bookingDetails: {
          hotelName: roomData.hotel.name,
          roomType: roomData.roomType,
          address: trimmedAddress,
          image: roomData.images[0],
          city: roomData.hotel.city,
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

    //User details
    const userDetail = bookings.map((data) => ({
      username: data?.user?.username,
      roomType: data?.room?.roomType,
      amount: data?.totalPrice,
      paymentStatus: data?.isPaid,
    }));

    console.log("User details :", userDetail);

    console.log(
      `[getHotelBooking] All bookings for hotel ${hotel} fetched successfully`
    );
    res.status(200).json({
      success: true,
      dashBoardData: { totalBookings, totalRevenue, bookings, userDetail },
    });
  } catch (err) {
    console.error("Error in getHotelBooking function: ", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
};

//API to delete a booking
//? Route - delete => /api/bookings/delete

export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Check if bookingId is provided
    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }

    // Validate if bookingId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking ID format" });
    }

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Update the booking status to cancelled
    const result = await Booking.updateOne(
      { _id: bookingId },
      { $set: { status: "Cancelled" } }
    );

    // Check if the update was unsuccessful
    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to cancel the booking" });
    }

    //Fetch the updated booking
    const updatedBooking = await Booking.findById(bookingId).populate(
      "room hotel"
    );

    const checkInDate = updatedBooking.checkInDate;
    const checkOutDate = updatedBooking.checkOutDate;
    const guests = updatedBooking.guests;
    const totalPrice = updatedBooking.totalPrice;

    console.log("[deleteBooking] Cancelled booking: ", bookingId);
    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });

    //Sending cancellation email
    try {
      await cancelConfirmation({
        email: req.user.email,
        username: req.user.username,
        bookingDetails: {
          hotelName: updatedBooking.hotel.name,
          roomType: updatedBooking.room.roomType,
          checkIn: new Date(checkInDate),
          checkOut: new Date(checkOutDate),
          guests,
          totalPrice,
        },
      });
      console.log("Cancellation email sent to: ", req.user.email);
    } catch (emailErr) {
      console.error(
        "[deleteBooking] Failed to send cancellation email:",
        emailErr
      );
    }
  } catch (err) {
    console.error("Error in deleteBooking function: ", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel the booking" });
  }
};

//API for payyment
export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room).populate("hotel");
    const totalPrice = booking.totalPrice;
    const { origin } = req.headers;

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: roomData.hotel.name,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ];

    //Access user's email
    const userEmail = req.user?.emailAddresses?.[0]?.emailAddress;

    //Creatte a Stripe customer
    const customer = await stripeInstance.customers.create({
      email: userEmail,
      metadata: {
        userId: req.user.id,
      },
    });

    //Create Checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `${origin}/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: {
        bookingId,
      },
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: "Payment failure" });
    console.log("Error in stripePayment function :", err);
  }
};
