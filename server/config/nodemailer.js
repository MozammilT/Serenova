import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: "465",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export default transporter;
