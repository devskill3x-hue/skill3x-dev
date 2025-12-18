import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * CREATE ORDER
 */
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { planName, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      planName,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * VERIFY PAYMENT & SAVE TRANSACTION
 */
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planName,
      amount,
      amountWithoutGST,
    } = req.body;

    // 🔐 Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 👉 Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    const transaction = await Transaction.create({
      userId: req.user.id,
      course: planName,

      amount: amount.toString(), // with GST
      amountWithoutGST: amountWithoutGST.toString(),

      paymentMethod: payment.method, // card / upi / netbanking

      status: "Completed",
      transactionId: razorpay_payment_id,
    });

    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * GET USER TRANSACTIONS
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
