import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    //Create a Svix instance with cler webhook  secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //Get Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    //verify Headers
    await whook.verify(JSON.stringify(req.body), headers);

    //Getting Data from req body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    //Switch cases for different events
    switch (type) {
      case "user.create": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id, userData);
        break;
      }
    }
    res.json({ success: true, message: "Webhook Received" });
  } catch (err) {
    console.log(err).message;
    res.json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;