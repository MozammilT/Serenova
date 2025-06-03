import Hotel from "../models/hotel.js";
import User from "../models/user.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    //Check if the Hotel is already registers
    const hotel = await Hotel.find({ owner });
    if (!hotel) {
      return res.json({ success: false, message: "hotel already registered" });
    }

    await Hotel.create({ name, address, contact, city, owner });
    res.json({ success: true, message: "Hotel registered successfully" });
  } catch (err) {
    console.log("error registering hotel: ", err);
    res.json({ success: false, message: err.message });
  }
};
