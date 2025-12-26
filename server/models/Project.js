import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    courseId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    requirements: { type: [String], default: [] },
    submissionType: {
      type: String,
      enum: ["TEXT", "DRIVE_LINK"],
      default: "TEXT"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
