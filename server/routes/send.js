import express from "express";
import sendPhishingEmail from "../mailer.js";

const router = express.Router();

// GET /api/send?email=user@corp.com
router.get("/", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).send("Email required");

  try {
    await sendPhishingEmail(email);
    res.send("Email sent");
  } catch (err) {
    console.error("Mailer error:", err);
    res.status(500).send("Send failed");
  }
});

export default router;
