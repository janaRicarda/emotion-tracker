import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  owner: { type: String, required: true },
  isWarmTheme: { type: Boolean },
  isColdTheme: { type: Boolean },
  isNeutralTheme: { type: Boolean },
  isHighContrastTheme: { type: Boolean },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
