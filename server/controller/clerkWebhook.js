import { Webhook } from "svix";
import { buffer } from "micro";
import User from "../models/user.js";

export const config = {
  api: {
    bodyParser: false, // tells Vercel NOT to parse the body
  },
};

const clerkWebhooks = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const payload = await buffer(req); // get raw buffer
  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const parsedBody = wh.verify(payload, headers);

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

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(id, userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(id);
        break;
      default:
        console.log("Unhandled event type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (err) {
    console.error("Webhook verification failed", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
