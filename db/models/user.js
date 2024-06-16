import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  theme: { type: Object, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
