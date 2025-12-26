import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
   CREATE ORDER
===================================================== */
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { planName, amount } = req.body;

    if (!planName || !amount) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      planName
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* =====================================================
   VERIFY PAYMENT + ACTIVATE SUBSCRIPTION
===================================================== */
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planName,
      amount,
      amountWithoutGST
    } = req.body;

    /* ---------- VERIFY SIGNATURE ---------- */
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    /* ---------- SAVE TRANSACTION ---------- */
    const transaction = await Transaction.create({
      userId: req.user.id,
      course: planName,
      amount: amount.toString(), // with GST
      amountWithoutGST: amountWithoutGST.toString(),
      status: "Completed",
      transactionId: razorpay_payment_id
    });

    /* ---------- ACTIVATE USER SUBSCRIPTION ---------- */
    let months = 0;
    if (planName === "BEGINNER") months = 3;
    if (planName === "PRO") months = 6;
    if (planName === "CAREER") months = 12;

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    await User.findByIdAndUpdate(
      req.user.id,
      {
        plan: planName,
        planExpiresAt: expiryDate
      },
      { new: true }
    );

    /* ---------- SUCCESS RESPONSE ---------- */
    res.json({
      success: true,
      message: "Payment verified & subscription activated",
      transaction,
      planExpiresAt: expiryDate
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

/* =====================================================
   GET USER TRANSACTIONS
===================================================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;

