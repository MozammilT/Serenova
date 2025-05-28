import { Webhook } from "svix";
import User from "../models/user.js";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
  // Verify the request method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Verify the webhook secret is configured
  if (!webhookSecret) {
    console.error("Webhook secret not configured");
    return res.status(500).json({ message: "Webhook secret not configured" });
  }

  // Get the headers
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  // If there are missing headers, return 400
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return res.status(400).json({
      message: "Missing svix headers",
      headers: JSON.stringify(req.headers),
    });
  }

  console.log("Headers received:", {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  });

  try {
    const wh = new Webhook(webhookSecret);

    // Get the raw body as a string
    const payload = req.body.toString("utf8");
    console.log("Received webhook payload:", payload.substring(0, 100) + "...");

    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Handle the webhook
    const { type, data } = evt;
    console.log("Webhook event:", {
      type,
      data: JSON.stringify(data).substring(0, 100) + "...",
    });

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

        console.log("Creating user:", userData);
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

        console.log("Updating user:", userData);
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

    return res.status(200).json({
      success: true,
      message: `Webhook processed successfully: ${type}`,
    });
  } catch (err) {
    console.error("Webhook verification failed:", {
      error: err.message,
      stack: err.stack,
      headers: {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      },
    });
    return res.status(400).json({
      success: false,
      message: "Webhook verification failed",
      error: err.message,
    });
  }
};

export default clerkWebhooks;
