import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    /* ---------- COURSE ID / SLUG ---------- */
    id: {
      type: String,
      required: true,
      unique: true
    },

    /* ---------- BASIC DETAILS ---------- */
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    image: {
      type: String
    },

    /* ---------- ACCESS CONTROL ---------- */
    accessLevel: {
      type: String,
      enum: ["BEGINNER", "PRO", "CAREER"],
      required: true,
      default: "BEGINNER"
    },

    /* ---------- USER PROGRESS ---------- */
    progress: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

/* 🔥 Prevent overwrite model error */
export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema);
