import Hotel from "../models/hotel.js";
import User from "../models/user.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city, hotelBrand } = req.body;
    const owner = req.user._id;

    console.log("Incoming hotel registration from user: ", owner);

    //Check if the Hotel is already registers
    const hotel = await Hotel.find({ owner });
    if (!hotel) {
      return res.json({ success: false, message: "hotel already registered" });
    }

    await Hotel.create({ name, address, contact, city, owner, hotelBrand });
    const userUpdateResult = await User.updateOne(
      { _id: owner },
      { $set: { role: "hotelOwner" } }
    );
    console.log("[hotelController] Role update result:", userUpdateResult);
    res.json({ success: true, message: "Hotel registered successfully" });
  } catch (err) {
    console.log("error registering hotel: ", err);
    res.json({ success: false, message: err.message });
  }
};
