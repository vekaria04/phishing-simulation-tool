import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
  email: String,
  type: String, // open, click, submitted
  timestamp: { type: Date, default: Date.now },
  meta: mongoose.Schema.Types.Mixed,
});

export default mongoose.model("Interaction", interactionSchema);
