import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // slug (optional use)
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    image: { type: String },

    accessLevel: {
      type: String,
      enum: ["BEGINNER", "PRO", "CAREER"],
      required: true,
      default: "BEGINNER"
    },

    progress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema);
