import transporter from "../config/nodemailer.js";

export const sendWelcomeEmail = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "No email provided" });
  }
  const mailOptions = {
    from: `\"Serenova News Letters\" <${process.env.EMAIL}>`,
    to: email,
    subject: "Welcome to Serenova",
    html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Serenova Newsletter</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      color: #111;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #f5f5f5; padding: 20px 0"
    >
      <tr>
        <td align="center">
          <!-- Container -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background: #f5f5f5; border-radius: 8px; overflow: hidden"
          >
            <!-- Header -->
            <tr>
              <td style="padding: 20px">
                <h2
                  style="
                    margin: 0;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #555;
                    font-size: xx-large;
                    font-family: Verdana, Geneva, sans-serif;
                  "
                >
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="#808080"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.75284 10.443C2 11.8184 2 13.4775 2 16.7957V19.0013C2 24.6574 2 27.4856 3.69878 29.2427C5.39757 31 8.1317 31 13.6 31H19.4C24.8682 31 27.6025 31 29.3012 29.2427C31 27.4856 31 24.6574 31 19.0013V16.7957C31 13.4775 31 11.8184 30.2472 10.443C29.4943 9.0676 28.119 8.21399 25.3682 6.50677L22.4682 4.70696C19.5604 2.90232 18.1065 2 16.5 2C14.8935 2 13.4396 2.90232 10.5318 4.70696L7.63184 6.50679C4.88108 8.21399 3.50568 9.0676 2.75284 10.443ZM12.7976 21.4264C12.3151 21.0687 11.634 21.1699 11.2763 21.6524C10.9187 22.135 11.0199 22.8161 11.5024 23.1736C12.9124 24.2188 14.6368 24.8375 16.5 24.8375C18.3633 24.8375 20.0876 24.2188 21.4976 23.1736C21.9801 22.8161 22.0813 22.135 21.7236 21.6524C21.3661 21.1699 20.685 21.0687 20.2024 21.4264C19.1463 22.2091 17.8716 22.6625 16.5 22.6625C15.1284 22.6625 13.8538 22.2091 12.7976 21.4264Z"
                      fill="#808080"
                    />
                  </svg>
                  Serenova
                </h2>
                <!-- <p style="font-size: 12px; color: #888">Breathtaking Views</p> -->
                <h1
                  style="
                    font-size: 24px;
                    font-family: Georgia, serif;
                    margin: 10px 0;
                  "
                >
                  FROM OUR HOTEL
                </h1>
                <p style="font-size: 16px; color: #555; font-family: Verdana, Geneva, sans-serif;">
                  Unparalleled luxury and comfort await at the world's most
                  exclusive hotels and resorts. <br />
                  Start your journey today.
                </p>
              </td>
            </tr>

            <!-- Main Image -->
            <tr>
              <td>
                <!-- Replace below src with your hotel image -->
                <img
                  src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907311/330266242_wvj0pn.jpg"
                  alt="Main Hotel"
                  style="
                    width: 100%;
                    height: auto;
                    display: block;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                  "
                />
              </td>
            </tr>

            <!-- Price Section -->
            <tr>
              <td
                style="
                  padding: 20px;
                  background: #f59e0b;
                  color: white;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                "
              >
                <span style="font-size: 16px; font-family: Verdana, Geneva, sans-serif;"
                  >from <strong style="font-size: 22px">$379</strong></span
                >
                <a
                  href="#"
                  style="
                    float: right;
                    background: #111;
                    color: white;
                    padding: 10px 16px;
                    text-decoration: none;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: Verdana, Geneva, sans-serif;
                  "
                  >Learn More</a
                >
              </td>
            </tr>

            <!-- Villas Section -->
            <tr>
              <td style="padding: 20px">
                <!-- Villa 1 -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding-right: 10px">
                      <!-- Replace below src -->
                      <img
                        src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907310/328777939_gcigjs.jpg"
                        alt="Villa 1"
                        style="
                          width: 100%;
                          height: 200px;
                          border-radius: 6px;
                          object-fit: cover;
                        "
                      />
                    </td>
                    <td
                      width="50%"
                      style="vertical-align: top; padding-left: 10px"
                    >
                      <h3
                        style="
                          margin-top: 0;
                          font-family: Georgia, serif;
                        "
                      >
                        Luxury Bedroom Villa
                      </h3>
                      <p
                        style="
                          font-size: 14px;
                          color: #555;
                          font-family: Verdana, Geneva, sans-serif;
                        "
                      >
                        Experience ultimate comfort in our elegantly designed
                        villa, where luxury meets serenity. <br />
                        Wake up to breathtaking views and top-tier amenities.
                      </p>
                      <p style="color: #f59e0b; font-family: Verdana, Geneva, sans-serif;">
                        <strong>$399/night</strong>
                      </p>
                      <a
                        href="#"
                        style="
                          background: #111;
                          color: white;
                          padding: 8px 14px;
                          text-decoration: none;
                          border-radius: 4px;
                          font-size: 14px;
                          font-family: Verdana, Geneva, sans-serif;
                        "
                        >Learn More</a
                      >
                    </td>
                  </tr>
                </table>

                <hr
                  style="
                    margin: 30px 0;
                    border: none;
                    border-top: 1px solid #e5e5e5;
                  "
                />

                <!-- Villa 2 -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td
                      width="50%"
                      style="padding-right: 10px; vertical-align: top"
                    >
                      <h3 style="font-family: Georgia, serif">
                        Seanic Bedroom Villa
                      </h3>
                      <p
                        style="
                          font-size: 14px;
                          color: #555;
                          font-family: Verdana, Geneva, sans-serif;
                        "
                      >
                        Soak in panoramic views from your cozy escape nestled in
                        nature. <br />
                        This villa blends scenic beauty with unmatched
                        tranquility
                      </p>
                      <p style="color: #f59e0b; font-family: Verdana, Geneva, sans-serif;">
                        <strong>$439/night</strong>
                      </p>
                      <a
                        href="#"
                        style="
                          background: #111;
                          color: white;
                          padding: 8px 14px;
                          text-decoration: none;
                          border-radius: 4px;
                          font-size: 14px;
                          font-family: Verdana, Geneva, sans-serif;;
                        "
                        >Learn More</a
                      >
                    </td>
                    <td width="50%" style="padding-left: 10px">
                      <!-- Replace below src -->
                      <img
                        src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907311/331356659_qali7k.jpg"
                        alt="Villa 2"
                        style="
                          width: 100%;
                          height: 200px;
                          border-radius: 6px;
                          object-fit: cover;
                        "
                      />
                    </td>
                  </tr>
                </table>

                <hr
                  style="
                    margin: 30px 0;
                    border: none;
                    border-top: 1px solid #e5e5e5;
                  "
                />

                <!-- Villa 3 -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding-right: 10px">
                      <!-- Replace below src -->
                      <img
                        src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907310/49283659_x7pnth.jpg"
                        alt="Villa 3"
                        style="
                          width: 100%;
                          height: 200px;
                          border-radius: 6px;
                          object-fit: cover;
                        "
                      />
                    </td>
                    <td
                      width="50%"
                      style="padding-left: 10px; vertical-align: top"
                    >
                      <h3 style="font-family: Georgia, serif">
                        Delux Villa
                      </h3>
                      <p
                        style="
                          font-size: 14px;
                          color: #555;
                          font-family: Verdana, Geneva, sans-serif;;
                        "
                      >
                        Indulge in refined comfort with our Deluxe Villa,
                        crafted for elegance and ease. <br />
                        Perfect for a luxurious stay with all the modern perks
                      </p>
                      <p style="color: #f59e0b; font-family: Verdana, Geneva, sans-serif;">
                        <strong>$599/night</strong>
                      </p>
                      <a
                        href="#"
                        style="
                          background: #111;
                          color: white;
                          padding: 8px 14px;
                          text-decoration: none;
                          border-radius: 4px;
                          font-size: 14px;
                          font-family: Verdana, Geneva, sans-serif;;
                        "
                        >Learn More</a
                      >
                    </td>
                  </tr>
                </table>

                <hr
                  style="
                    margin: 30px 0;
                    border: none;
                    border-top: 1px solid #e5e5e5;
                  "
                />
              </td>
            </tr>

            <!-- Snow Trips Section -->
            <tr>
              <td
                style="
                  background: url('https://res.cloudinary.com/dsotpoln9/image/upload/fl_preserve_transparency/v1749907311/459916013_njdyrl.jpg?_s=public-apps')
                    center center / cover no-repeat;
                  color: white;
                  text-align: center;
                  padding: 40px 20px;
                  border-radius: 6px;
                "
              >
                <h2
                  style="
                    margin: 0 0 10px;
                    font-family: Georgia, serif;
                  "
                >
                  EVERY DAY SNOW TRIPS
                </h2>
                <p
                  style="
                    font-size: 14px;
                    margin-bottom: 20px;
                    color: #8d8d8d;
                    font-weight: bold;
                    font-family: Verdana, Geneva, sans-serif;;
                  "
                >
                  Chase the snow every single day with guided adventures and
                  scenic trails. Perfect for thrill-seekers and winter lovers
                  alike
                </p>
                <a
                  href="#"
                  style="
                    background: white;
                    color: #1e293b;
                    padding: 10px 18px;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 14px;
                    font-family: Verdana, Geneva, sans-serif;;
                  "
                  >Learn More</a
                >
              </td>
            </tr>

            <!-- Trip Thumbnails -->
            <tr>
              <td style="padding: 15px">
                <table width="100%" cellpadding="0" cellspacing="15">
                  <tr>
                    <td width="33%" style="text-align: center">
                      <img
                        src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907310/176563512_k6dlev.jpg"
                        alt="Trip 1"
                        style="width: 100%; border-radius: 6px"
                      />
                      <p
                        style="
                          margin: 10px 0 5px;
                          font-family: Georgia, serif;
                          padding-bottom: 10px;
                          font-family: Verdana, Geneva, sans-serif;;
                          color: #f59e0b;
                        "
                      >
                        <strong>Open Sky Dining</strong>
                      </p>
                      <a
                        href="#"
                        style="
                          background: #111;
                          color: white;
                          padding: 6px 12px;
                          text-decoration: none;
                          font-size: 12px;
                          border-radius: 4px;
                          font-family: Verdana, Geneva, sans-serif;;
                        "
                        >Learn More</a
                      >
                    </td>
                    <td width="33%" style="text-align: center">
                      <img
                        src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907311/302738413_orqplw.jpg"
                        alt="Trip 2"
                        style="width: 100%; border-radius: 6px"
                      />
                      <p
                        style="
                          margin: 10px 0 5px;
                          font-family: Georgia, serif;
                          padding-bottom: 10px;
                          font-family: Verdana, Geneva, sans-serif;;
                          color: #f59e0b;
                        "
                      >
                        <strong>Private Pool</strong>
                      </p>
                      <a
                        href="#"
                        style="
                          background: #111;
                          color: white;
                          padding: 6px 12px;
                          text-decoration: none;
                          font-size: 12px;
                          border-radius: 4px;
                          font-family: Verdana, Geneva, sans-serif;
                        "
                        >Learn More</a
                      >
                    </td>
                    <td width="33%" style="text-align: center">
                      <img
                        src="https://res.cloudinary.com/dsotpoln9/image/upload/v1749907311/328776444_ntjd9x.jpg"
                        alt="Trip 3"
                        style="width: 100%; border-radius: 6px"
                      />
                      <p
                        style="
                          margin: 10px 0 5px;
                          font-family: Georgia, serif;
                          padding-bottom: 10px;
                          font-family: Verdana, Geneva, sans-serif;;
                          color: #f59e0b;
                        "
                      >
                        <strong>Private Bar</strong>
                      </p>
                      <a
                        href="#"
                        style="
                          background: #111;
                          color: white;
                          padding: 6px 12px;
                          text-decoration: none;
                          font-size: 12px;
                          border-radius: 4px;
                          font-family: Verdana, Geneva, sans-serif;;
                        "
                        >Learn More</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background: #1e293b;
                  color: white;
                  padding: 30px 20px 10px 20px;
                  text-align: center;
                "
              >
                <p
                  style="
                    margin: 0 0 10px;
                    color: #c5c5c5;
                    font-size: medium;
                    font-family: Verdana, Geneva, sans-serif;;
                  "
                >
                  Discover the world's most extraordinary places to stay, from
                  boutique hotels to luxury villas and private islands.
                </p>
                <p
                  style="
                    margin: 0 0 20px;
                    color: #c5c5c5;
                    font-size: small;
                    font-family: Verdana, Geneva, sans-serif;;
                  "
                >
                  Contact Us @ 1800-246-759
                </p>
                <p style="margin: 0">
                  <a
                    href="#"
                    aria-label="Instagram"
                    style="color: white; margin: 0 8px; text-decoration: none"
                    ><svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.875 1.75H6.125C3.70875 1.75 1.75 3.70875 1.75 6.125V14.875C1.75 17.2912 3.70875 19.25 6.125 19.25H14.875C17.2912 19.25 19.25 17.2912 19.25 14.875V6.125C19.25 3.70875 17.2912 1.75 14.875 1.75Z"
                        stroke="#f5f5f5"
                        stroke-opacity="0.76"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3125 5.6875H15.3212M14 9.94875C14.108 10.677 13.9836 11.4207 13.6445 12.0741C13.3055 12.7276 12.769 13.2575 12.1114 13.5885C11.4538 13.9194 10.7086 14.0346 9.9818 13.9177C9.25497 13.8007 8.58353 13.4576 8.06297 12.937C7.54242 12.4165 7.19925 11.745 7.0823 11.0182C6.96534 10.2914 7.08054 9.54616 7.41152 8.88858C7.7425 8.231 8.2724 7.69452 8.92585 7.35546C9.5793 7.0164 10.323 6.89201 11.0512 7C11.794 7.11015 12.4817 7.45628 13.0127 7.98727C13.5437 8.51826 13.8898 9.20594 14 9.94875Z"
                        stroke="#f5f5f5"
                        stroke-opacity="0.76"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    style="color: white; margin: 0 8px; text-decoration: none"
                    ><svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 1.75H13.125C11.9647 1.75 10.8519 2.21094 10.0314 3.03141C9.21094 3.85188 8.75 4.96468 8.75 6.125V8.75H6.125V12.25H8.75V19.25H12.25V12.25H14.875L15.75 8.75H12.25V6.125C12.25 5.89294 12.3422 5.67038 12.5063 5.50628C12.6704 5.34219 12.8929 5.25 13.125 5.25H15.75V1.75Z"
                        stroke="#f5f5f5"
                        stroke-opacity="0.76"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkdIn"
                    style="color: white; margin: 0 8px; text-decoration: none"
                    ><svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.25 3.49904C19.25 3.49904 18.6375 5.33654 17.5 6.47404C18.9 15.224 9.275 21.6115 1.75 16.624C3.675 16.7115 5.6 16.099 7 14.874C2.625 13.5615 0.4375 8.39904 2.625 4.37404C4.55 6.64904 7.525 7.96154 10.5 7.87404C9.7125 4.19904 14 2.09904 16.625 4.54904C17.5875 4.54904 19.25 3.49904 19.25 3.49904Z"
                        stroke="#f5f5f5"
                        stroke-opacity="0.76"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </p>
                <p style="margin-top: 20px; font-size: 12px; color: #cbd5e1">
                  <a
                    href="#"
                    style="
                      color: #cbd5e1;
                      text-decoration: underline;
                      font-family: Verdana, Geneva, sans-serif;;
                      font-size: small;
                    "
                    >Unsubscribe here</a
                  >
                </p>
              </td>
            </tr>
          </table>
          <!-- End Container -->
        </td>
      </tr>
    </table>
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
                <td style="padding: 8px; border: 1px solid #ddd">${
                  process.env.CURRENCY || "$"
                }${bookingDetails?.totalPrice || "Not Provided"}</td>
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
