import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.username,
          image: data.image_url,
        };
        try {
          const existingUser = await User.findById(userData.username);
          if (existingUser) {
            console.log("❌ Username should be unique: ", userData.username);
            res
              .status(409)
              .json({ success: true, message: "Username already exists" });
            return;
          }

          await User.create(userData);
          console.log("✅ User created:", userData);
          break;
        } catch (err) {
          console.error("❌ Error creating user:", err);
          throw err;
        }
      }

      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.username,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(userData._id, userData);
        console.log("✅ User updated:", userData);
        break;
      }
      case "user.deleted": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "N/A",
          username: data.username || "N/A",
          image: data.image_url || "N/A",
        };

        await User.findByIdAndDelete(userData._id);
        console.log("✅ User deleted:", userData);
        break;
      }
      default: {
        console.log("❌ Unhandled event type:", type);
        break;
      }
    }
    res.json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("❌ Error in clerk webhook:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default clerkWebhook;
