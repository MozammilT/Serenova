import Hotel from "../models/hotel.js";
import User from "../models/user.js";
import Room from "../models/room.js";

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

export const getAllHotel = async (req, res) => {
  try {
    const cheapestRoom = await Room.aggregate([
      {
        $sort: {
          hotel: 1,
          pricePerNight: 1,
        },
      },
      {
        $group: {
          _id: "$hotel",
          cheapestRoom: {
            $first: "$$ROOT",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$cheapestRoom",
        },
      },
      {
        $addFields: {
          hotel: {
            $toObjectId: "$hotel",
          },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "hotel",
          foreignField: "_id",
          as: "hotelDetails",
        },
      },
      {
        $unwind: "$hotelDetails",
      },
    ]);
    if (cheapestRoom.length === 0) {
      return res
        .status(502)
        .json({ success: false, message: "No hotel found" });
    } else {
      res.status(200).json({ success: true, cheapestRoom });
    }
  } catch (err) {
    console.log("Error in getAlllHotel function: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
