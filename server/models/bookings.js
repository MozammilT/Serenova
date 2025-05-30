import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: String, ref: "User", required: true },
    room: { type: String, ref: "Room", required: true },
    hotel: { type: String, ref: "Hotel", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "l̥Cancelled", "Completed"],
      default: "Pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "Pay at Hotel",
      required: true,
    },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
