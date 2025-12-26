import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true },
    title: { type: String, required: true },
    resourceType: { type: String }, // PDF, LINK
    cloudProvider: { type: String },
    url: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Resource ||
  mongoose.model("Resource", resourceSchema);
