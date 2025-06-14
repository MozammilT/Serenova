import transporter from "../config/nodemailer.js";

export const sendWelcomeEmail = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "No email provided" });
  }
  const mailOptions = {
    from: `\"Team Serenova\" <${process.env.EMAIL}>`,
    to: email,
    subject: "Welcome to Serenova",
    html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
          </head>
            <body>
              <h1>Welcome Mozammil</h1>
            </body>
        </html>
         `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "Failed to send the email." });
      console.error("Error sending welcome email:", err);
    } else {
      res.status(200).json({ success: true, message: "Email sent" });
      console.log(`Welcome email sent to ${email}:`, info.response);
    }
  });
};

export const bookingConfirmation = async ({
  email,
  username,
  bookingDetails,
}) => {
  if (!email) {
    throw new Error("No email provided");
  }
  if (!username) {
    throw new Error("NO username provided");
  }
  const formattedUsername =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  const mailOptions = {
    from: `"Team Serenova" <${process.env.EMAIL}>`,
    to: email,
    subject: "Booking Confirmation - Serenova",
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto">
            <h2 style="color: #6bbefa">Booking Confirmed!</h2>
            <p>Dear ${formattedUsername || "Guest"},</p>
            <p>
              Thank you for booking with <b>Serenova</b>. Your reservation is
              confirmed. Here are your booking details:
            </p>
            <table style="width: 100%; border-collapse: collapse">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd">Hotel</td>
                <td style="padding: 8px; border: 1px solid #ddd">${
                  bookingDetails?.hotelName || "Not Provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd">Room</td>
                <td style="padding: 8px; border: 1px solid #ddd">${
                  bookingDetails?.roomType || "Not Provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd">Check-in</td>
                <td style="padding: 8px; border: 1px solid #ddd">${
                  bookingDetails?.checkInDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }) || "Not Provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd">Check-out</td>
                <td style="padding: 8px; border: 1px solid #ddd">${
                  bookingDetails?.checkOutDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }) || "Not Provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd">Guests</td>
                <td style="padding: 8px; border: 1px solid #ddd">${
                  bookingDetails?.guests || "Not Provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd">Total Price</td>
                <td style="padding: 8px; border: 1px solid #ddd">${process.env.CURRENCY}${
                  bookingDetails?.totalPrice || "Not Provided"
                }</td>
              </tr>
            </table>
            <p style="margin-top: 20px">We look forward to hosting you!</p>
            <p>
              Best regards,<br />
              The Serenova Team
            </p>
          </div>`,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending booking confirmation email:", err);
        reject(err);
      } else {
        console.log("Booking confirmation email sent:", info.response);
        resolve(info);
      }
    });
  });
};

export default bookingConfirmation;
