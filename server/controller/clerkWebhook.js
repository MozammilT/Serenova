import { Webhook } from "svix";
import User from "../models/user.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkWebhooks = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const payload = req.body; // Get the raw body from bodyParser
  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  // Log headers for debugging
  console.log("Webhook Headers:", headers);

  try {
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      throw new Error("CLERK_WEBHOOK_SECRET is not configured");
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const parsedBody = wh.verify(JSON.stringify(payload), headers);

    console.log("Webhook Event Type:", parsedBody.type);
    console.log("Webhook Data:", parsedBody.data);

    const { type, data } = parsedBody;
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      primary_email_id,
    } = data;

    const userData = {
      _id: id,
      email:
        email_addresses?.find?.((email) => email.id === primary_email_id)
          ?.email_address || "",
      username: [first_name, last_name].filter(Boolean).join(" ") || "Unknown",
      image: image_url || "",
    };

    console.log("Processing user data:", userData);

    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("User created successfully:", id);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(id, userData);
        console.log("User updated successfully:", id);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(id);
        console.log("User deleted successfully:", id);
        break;
      default:
        console.log("Unhandled event type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (err) {
    console.error("Webhook error details:", {
      message: err.message,
      stack: err.stack,
      headers: headers,
      body: typeof payload === "string" ? payload : JSON.stringify(payload),
    });
    res.status(400).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
