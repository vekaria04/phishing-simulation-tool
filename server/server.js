import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

import trackRouter from "./routes/track.js";
import sendRouter from "./routes/send.js";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client"))); // serve HTML

// API routes
app.use("/api/track", trackRouter);
app.use("/api/send", sendRouter);

// DB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/phishingSim";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(" Mongo error:", err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
