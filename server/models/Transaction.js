import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: String,
    },

    // 👉 Total amount (with GST)
    amount: {
      type: String,
    },

    // 👉 NEW: Amount without GST
    amountWithoutGST: {
      type: String,
    },

    // 👉 NEW: Payment method (card, upi, netbanking, wallet)
    paymentMethod: {
      type: String,
    },

    status: {
      type: String,
      default: "Completed",
    },

    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
