import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    courseId: { type: String, required: true }, // slug
    title: { type: String, required: true },
    order: { type: Number, default: 1 },
    videoUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Chapter ||
  mongoose.model("Chapter", chapterSchema);
