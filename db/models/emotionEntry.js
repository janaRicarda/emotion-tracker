import mongoose from "mongoose";

const { Schema } = mongoose;

const EmotionEntrySchema = new Schema({
  tensionLevel: { type: String },
  timeAndDate: { type: String },
  isoDate: { type: String },
  emotion: { type: String },
  subemotion: { type: String },
  intensity: { type: String },
  trigger: { type: String },
  notes: { type: String },
  id: { type: String },
});

const EmotionEntry =
  mongoose.models.EmotionEntry ||
  mongoose.model("EmotionEntry", EmotionEntrySchema);

export default EmotionEntry;
