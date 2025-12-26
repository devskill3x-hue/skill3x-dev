import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    courseId: { type: String, required: true },
    title: { type: String, required: true },
    instructions: { type: String },
    order: { type: Number },
    submissionType: {
      type: String,
      enum: ["TEXT", "DRIVE_LINK"],
      default: "TEXT"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Exercise ||
  mongoose.model("Exercise", exerciseSchema);
