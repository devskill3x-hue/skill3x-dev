import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Subscription.css";

/* ------------------ CONSTANTS ------------------ */
const GST_RATE = 0.18;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const RAZORPAY_KEY_ID = "rzp_test_RsHyO8Jg0oCORq";

/* ------------------ COUPONS ------------------ */
const COUPONS = [
  { code: "BOOST50", type: "PERCENT", value: 50 },
  { code: "WELCOME10", type: "FLAT", value: 500 }
];

/* ------------------ PLANS ------------------ */
const PLANS_DATA = [
  {
    id: "BEGINNER",
    planKey: "BEGINNER",
    title: "Beginner Plan",
    duration: "3 Months",
    priceVal: 5999,
    priceDisplay: "5,999",
    months: 3
  },
  {
    id: "PRO",
    planKey: "PRO",
    title: "Pro Plan",
    duration: "6 Months",
    priceVal: 11999,
    priceDisplay: "11,999",
    months: 6
  },
  {
    id: "CAREER",
    planKey: "CAREER",
    title: "Career Mastery",
    duration: "12 Months",
    priceVal: 16999,
    priceDisplay: "16,999",
    months: 12
  }
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: ""
  });

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [errors, setErrors] = useState({});

  /* ------------------ RESET ON MODAL CLOSE ------------------ */
  useEffect(() => {
    if (!showModal) {
      setFormData({ name: "", email: "", phone: "", pincode: "" });
      setCouponInput("");
      setAppliedCoupon(null);
      setErrors({});
    }
  }, [showModal]);

  /* ------------------ VALIDATION ------------------ */
  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Valid email required";
    if (!PHONE_REGEX.test(formData.phone)) e.phone = "Invalid phone";
    if (!PINCODE_REGEX.test(formData.pincode)) e.pincode = "Invalid pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ------------------ COUPON LOGIC ------------------ */
  const applyCoupon = () => {
    const c = COUPONS.find(
      x => x.code === couponInput.toUpperCase()
    );
    if (!c) return alert("Invalid Coupon");
    setAppliedCoupon(c);
  };

  const baseAmount = selectedPlan?.priceVal || 0;

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount =
      appliedCoupon.type === "PERCENT"
        ? Math.round((baseAmount * appliedCoupon.value) / 100)
        : appliedCoupon.value;
  }

  const discountedPrice = Math.max(baseAmount - discountAmount, 0);
  const gstAmount = Math.round(discountedPrice * GST_RATE);
  const totalAmount = discountedPrice + gstAmount;

  /* ------------------ RAZORPAY LOADER ------------------ */
  const loadRazorpay = () =>
    new Promise(resolve => {
      if (window.Razorpay) resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  /* ------------------ PAYMENT ------------------ */
  const handlePay = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login");

    setLoading(true);
    const ok = await loadRazorpay();
    if (!ok) return alert("Razorpay failed");

    try {
      /* CREATE ORDER */
      const { data } = await axios.post(
        "http://localhost:5000/api/transactions/create-order",
        {
          planName: selectedPlan.planKey,
          amount: totalAmount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "SKILL3X",
        description: selectedPlan.title,
        order_id: data.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        handler: async response => {
          await axios.post(
            "http://localhost:5000/api/transactions/verify",
            {
              ...response,
              planName: selectedPlan.planKey,
              amount: totalAmount,
              amountWithoutGST: discountedPrice
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          /* UPDATE LOCAL USER */
          const user = JSON.parse(localStorage.getItem("user"));
          const expiry = new Date();
          expiry.setMonth(expiry.getMonth() + selectedPlan.months);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              plan: selectedPlan.planKey,
              planExpiresAt: expiry
            })
          );

          alert("Payment Successful 🎉");
          window.location.href = "/courses";
        }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="subscription-page">
      <h1>Choose Your Plan</h1>

      <div className="plans">
        {PLANS_DATA.map(plan => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.title}</h3>
            <p>{plan.duration}</p>
            <h2>₹{plan.priceDisplay}</h2>
            <button
              onClick={() => {
                setSelectedPlan(plan);
                setShowModal(true);
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <h3>{selectedPlan.title}</h3>

          <input
            placeholder="Name"
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Email"
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            maxLength={10}
            onChange={e =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, "")
              })
            }
          />
          <input
            placeholder="Pincode"
            maxLength={6}
            onChange={e =>
              setFormData({
                ...formData,
                pincode: e.target.value.replace(/\D/g, "")
              })
            }
          />

          <input
            placeholder="Coupon Code"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
          />
          <button onClick={applyCoupon}>Apply</button>

          <h3>Total: ₹{totalAmount}</h3>

          <button onClick={handlePay} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>

          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
