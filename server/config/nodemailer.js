import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // host: "smtp.mail.yahoo.com",
  // port: "587",
  // secure: false,
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export default transporter;
