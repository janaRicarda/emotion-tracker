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

const EmotionEntries =
  mongoose.models.EmotionEntries ||
  mongoose.model("EmotionEntries", EmotionEntrySchema);

export default EmotionEntries;
