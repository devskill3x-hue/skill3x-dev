import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: String,
    amount: String,
    status: String,
    transactionId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
