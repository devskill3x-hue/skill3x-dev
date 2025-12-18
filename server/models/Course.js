import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },   // URL-friendly slug
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
