import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true
    },

    plan: {
      type: String,
      enum: ["BEGINNER", "PRO", "CAREER", null],
      default: null
    },

    planExpiresAt: {
      type: Date,
      default: null
    },

    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

/* 🔥 PREVENT OVERWRITE MODEL ERROR */
export default mongoose.models.User ||
  mongoose.model("User", userSchema);
