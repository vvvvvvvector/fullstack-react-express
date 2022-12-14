import mongoose from "mongoose";

const UserScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { timestamps: true }
); // in addtion: +when user was created +when user was updated

export default mongoose.model("User", UserScheme);
