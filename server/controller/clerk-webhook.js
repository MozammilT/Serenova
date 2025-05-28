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

  try {
    // Get the raw request body as a buffer
    const rawBody = req.body;

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Log headers and body info for debugging
    console.log("Webhook Headers:", headers);
    console.log("Raw Body Type:", typeof rawBody);
    console.log("Is Buffer:", Buffer.isBuffer(rawBody));

    if (!process.env.CLERK_WEBHOOK_SECRET) {
      throw new Error("CLERK_WEBHOOK_SECRET is not configured");
    }

    // Create webhook instance
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Convert buffer to string for verification
    const stringBody = rawBody.toString("utf8");
    console.log("String Body:", stringBody.substring(0, 100) + "..."); // Log first 100 chars

    // Verify the webhook
    const parsedBody = wh.verify(stringBody, headers);

    console.log("Webhook Event Type:", parsedBody.type);
    console.log(
      "Webhook Data:",
      JSON.stringify(parsedBody.data).substring(0, 100) + "..."
    );

    const { type, data } = parsedBody;

    switch (type) {
      case "user.created": {
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          image_url,
          primary_email_address_id,
        } = data;

        const userData = {
          _id: id,
          email:
            email_addresses?.find?.(
              (email) => email.id === primary_email_address_id
            )?.email_address || "",
          username:
            [first_name, last_name].filter(Boolean).join(" ") || "Unknown",
          image: image_url || "",
        };

        console.log("Creating user with data:", userData);
        await User.create(userData);
        console.log("User created successfully:", id);
        break;
      }
      case "user.updated": {
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          image_url,
          primary_email_address_id,
        } = data;

        const userData = {
          email:
            email_addresses?.find?.(
              (email) => email.id === primary_email_address_id
            )?.email_address || "",
          username:
            [first_name, last_name].filter(Boolean).join(" ") || "Unknown",
          image: image_url || "",
        };

        console.log("Updating user with data:", userData);
        await User.findByIdAndUpdate(id, userData);
        console.log("User updated successfully:", id);
        break;
      }
      case "user.deleted": {
        const { id } = data;
        console.log("Deleting user:", id);
        await User.findByIdAndDelete(id);
        console.log("User deleted successfully:", id);
        break;
      }
      default:
        console.log("Unhandled event type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (err) {
    console.error("Webhook error details:", {
      message: err.message,
      stack: err.stack,
      headers: req.headers,
      rawBodyType: typeof req.body,
      isBuffer: Buffer.isBuffer(req.body),
      secret: process.env.CLERK_WEBHOOK_SECRET ? "Present" : "Missing",
    });
    res.status(400).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
