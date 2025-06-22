import stripe from "stripe";
import Booking from "../models/bookings.js";

// API to handle Stripe Webhooks
export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  let event;

  console.log("🔔 Incoming Stripe webhook received...");
  console.log("Headers:", req.headers);
  console.log("Raw Body:", req.body);

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Webhook signature verified successfully.");
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).json(`Webhook Error: ${err.message}`);
  }

  console.log("📦 Event type received:", event.type);

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    console.log("💰 PaymentIntent succeeded with ID:", paymentIntentId);

    try {
      const sessionList = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (!sessionList.data.length) {
        console.warn("⚠️ No session found for PaymentIntent:", paymentIntentId);
        return res.status(404).json({ message: "Session not found" });
      }

      const session = sessionList.data[0];
      const { bookingId } = session.metadata || {};

      console.log("🔎 Found session. Booking ID from metadata:", bookingId);

      if (!bookingId) {
        console.warn("⚠️ Booking ID missing in metadata.");
        return res
          .status(400)
          .json({ message: "Missing booking ID in metadata" });
      }

      const result = await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      });

      if (!result) {
        console.error(
          "❌ Failed to update booking. Booking not found:",
          bookingId
        );
        return res.status(404).json({ message: "Booking not found" });
      }

      console.log("✅ Booking updated as paid:", result._id);
    } catch (error) {
      console.error("❌ Error handling successful payment:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    console.log("ℹ️ Unhandled event type:", event.type);
  }

  res.json({ received: true });
};
