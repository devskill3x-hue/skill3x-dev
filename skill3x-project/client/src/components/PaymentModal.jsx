import { useState } from "react";
import axios from "axios";
import "../styles/PaymentModal.css";

const GST_RATE = 0.18;
const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

const COUPONS = [
  {
    code: "BOOST50",
    label: "Career Boost Wednesday 🎉",
    description: "GET FLAT 50% OFF ON 3, 6 & 12 Month Plans",
    type: "PERCENT",
    value: 50,
  },
];

export default function PaymentModal({ plan, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", pincode: "" });
  const [errors, setErrors] = useState({});

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!phoneRegex.test(form.phone)) e.phone = "Invalid phone number";
    if (!pincodeRegex.test(form.pincode)) e.pincode = "Invalid pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- COUPON LOGIC ---------------- */
  const applyCoupon = (code) => {
    const coupon = COUPONS.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );
    if (!coupon) {
      alert("Invalid coupon code");
      return;
    }
    setAppliedCoupon(coupon);
    setCouponInput(coupon.code);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
  };

  /* ---------------- PRICE CALC ---------------- */
  const baseAmount = plan.priceVal;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "PERCENT") {
      discountAmount = Math.round(
        (baseAmount * appliedCoupon.value) / 100
      );
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const discountedPrice = Math.max(baseAmount - discountAmount, 0);
  const gstAmount = Math.round(discountedPrice * GST_RATE);
  const totalAmount = discountedPrice + gstAmount;

  /* ---------------- RAZORPAY ---------------- */
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const handlePay = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");
    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay failed to load");

    const { data } = await axios.post(
      "http://localhost:5000/api/transactions/create-order",
      {
        planName: plan.title,
        amount: totalAmount,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: "rzp_test_RsHyO8Jg0oCORq",
      amount: data.amount,
      currency: "INR",
      name: "SKILL3X",
      description: plan.title,
      order_id: data.orderId,

      handler: async (response) => {
        await axios.post(
          "http://localhost:5000/api/transactions/verify",
          {
            ...response,
            planName: plan.title,
            amount: totalAmount,
            amountWithoutGST: discountedPrice,
            couponCode: appliedCoupon?.code || null,
            discountAmount,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Payment Successful 🎉");
        onClose();
      },
    };

    new window.Razorpay(options).open();
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        {/* LEFT */}
        <div className="checkout-left">
          <h2>{plan.title}</h2>
          <p>{plan.duration}</p>

          <div className="coupon-box">
            <div className="coupon-header">
              Select offer / Apply coupon
            </div>

            <input
              placeholder="Enter referral or discount code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />

            {!appliedCoupon ? (
              <button onClick={() => applyCoupon(couponInput)}>
                Apply
              </button>
            ) : (
              <button className="remove" onClick={removeCoupon}>
                Remove
              </button>
            )}

            <div className="available-coupons">
              {COUPONS.map((c) => (
                <div key={c.code} className="coupon-card">
                  <strong>{c.code}</strong>
                  <p>{c.description}</p>
                  <button onClick={() => applyCoupon(c.code)}>
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <h3>Enter your details</h3>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            placeholder="Phone Number"
            value={form.phone}
            maxLength={10}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            placeholder="Pincode"
            value={form.pincode}
            maxLength={6}
            onChange={(e) =>
              setForm({
                ...form,
                pincode: e.target.value.replace(/\D/g, ""),
              })
            }
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}

          <div className="price-box">
            <div>Base Price: ₹{baseAmount}</div>
            {appliedCoupon && (
              <div className="discount">
                Coupon ({appliedCoupon.code}): −₹{discountAmount}
              </div>
            )}
            <div>GST (18%): ₹{gstAmount}</div>
            <strong>Total: ₹{totalAmount}</strong>
          </div>

          <button className="pay-btn" onClick={handlePay}>
            Proceed to Pay
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
