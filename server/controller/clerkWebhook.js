import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    console.log("Webhook received");

    //Create a Svix instance with clerk webhook  secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //Get Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    if (
      !headers["svix-id"] ||
      !headers["svix-timestamp"] ||
      !headers["svix-signature"]
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required Svix headers" });
    }
    console.log("Headers:", headers);

    //Verify the headers
    const parsedBody = await whook.verify(JSON.stringify(req.body), headers);

    //Getting Data from req body
    const { data, type } = parsedBody;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    //Switch cases for different events - mongodb functions below to CRUD data in Atlas
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${type}`);
        break;
    }

    res.json({ success: true, message: "Webhook Received" });
  } catch (err) {
    console.error("Headers at failure:", req.headers);
    console.error("Body at failure:", req.body);
    console.log("Webhook error: ", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
