import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Force .env to load from server/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // app password / SMTP secret
  },
});

export default async function sendPhishingEmail(targetEmail) {
  const base = process.env.BASE_URL || "http://localhost:3000";
  const encoded = encodeURIComponent(targetEmail);

  const html = `
    <p>Dear user,</p>
    <p>We've detected unusual activity on your account. Please verify your identity to avoid suspension:</p>
    <p><a href="${base}/index.html?email=${encoded}">Verify now</a></p>
    <img src="${base}/api/track?email=${encoded}&type=open" width="1" height="1" alt="" />
    <p style="color:#888;font-size:12px">IT Security Team</p>
  `;

  const mailOptions = {
    from: `"IT Security" <${process.env.SMTP_USER}>`,
    to: targetEmail,
    subject: "Important: Account Verification Required",
    html,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Sent to ${targetEmail}`);
}
