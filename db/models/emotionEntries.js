import mongoose from "mongoose";

const { Schema } = mongoose;

const EmotionEntrySchema = new Schema({
  tensionLevel: { type: Number },
  timeAndDate: { type: String },
  isoDate: { type: String },
  emotion: { type: String },
  subemotion: { type: String },
  category: { type: String },
  intensity: { type: String },
  trigger: { type: String },
  notes: { type: String },
  isHighlighted: { type: Boolean },
});

const EmotionEntries =
  mongoose.models.EmotionEntries ||
  mongoose.model("EmotionEntries", EmotionEntrySchema);

export default EmotionEntries;
