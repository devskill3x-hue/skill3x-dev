import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Subscription.css";

/* ------------------ CONSTANTS ------------------ */
const GST_RATE = 0.18;
const EBOOK_PRICE = 99;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const RAZORPAY_KEY_ID = "rzp_test_RsHyO8Jg0oCORq"; 

/* ------------------ COUPONS ------------------ */
const COUPONS = [
  { code: "BOOST50", type: "PERCENT", value: 50, desc: "50% OFF on Beginner" },
  { code: "WELCOME10", type: "FLAT", value: 500, desc: "Flat ₹500 OFF" },
  { code: "SKILL20", type: "PERCENT", value: 20, desc: "20% OFF Season Sale" }
];

/* ------------------ PLANS DATA ------------------ */
const PLANS_DATA = [
  {
    id: "BEGINNER",
    planKey: "BEGINNER",
    title: "Beginner Plan",
    subtitle: "3-Month Subscription",
    priceVal: 5999,
    priceDisplay: "5,999",
    avgCost: "2000",
    months: 3,
    icon: "🔰",
    theme: "blue",
    btnText: "Get Started",
    features: [
      { text: "Full access to Beginner Courses", active: true },
      { text: "2 Live Classes/month", active: true },
      { text: "1 Hands-On Project", active: true },
      { text: "Community access", active: true },
      { text: "Completion certificate", active: true },
      { text: "Life Time Access of Courses", active: true },
      { text: "Premium Gems (AI + Auto)", active: false }
    ]
  },
  {
    id: "PRO",
    planKey: "PRO",
    title: "Pro Plan",
    subtitle: "6-Month Subscription",
    priceVal: 11999,
    priceDisplay: "11,999",
    avgCost: "1999",
    months: 6,
    icon: "⚡",
    theme: "purple",
    btnText: "Upgrade to Pro",
    isBestValue: true,
    features: [
      { text: "Full access to ALL SKILL3X Courses", active: true },
      { text: "4 Live Classes/month", active: true },
      { text: "2 Hands-On Project", active: true },
      { text: "Community access", active: true },
      { text: "Completion certificate", active: true },
      { text: "Weekly Practice assignments", active: true },
      { text: "Quick Support", active: true }
    ]
  },
  {
    id: "CAREER",
    planKey: "CAREER",
    title: "Career Mastery",
    subtitle: "12-Month Subscription",
    priceVal: 16999,
    priceDisplay: "16,999",
    avgCost: "1499",
    months: 12,
    icon: "🚀",
    theme: "green",
    btnText: "Become a Master",
    features: [
      { text: "Full access to All SKILL3X Courses", active: true },
      { text: "4 Live Classes/month", active: true },
      { text: "2 Hands-On Project", active: true },
      { text: "Premium Gems (AI + Auto)", active: true },
      { text: "Master Projects + Portfolio", active: true },
      { text: "Career Upgrade Tools", active: true },
      { text: "Monthly 1-on-1 Mentorship", active: true }
    ]
  }
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const [addEbook, setAddEbook] = useState(false);

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponsList, setShowCouponsList] = useState(false);
  const [errors, setErrors] = useState({});

  /* ------------------ RESET ON MODAL CLOSE ------------------ */
  useEffect(() => {
    if (!showModal) {
      setPincode("");
      setCouponInput("");
      setAppliedCoupon(null);
      setAddEbook(false);
      setShowCouponsList(false);
      setErrors({});
    }
  }, [showModal]);

  /* ------------------ VALIDATION ------------------ */
  const validateForm = () => {
    const e = {};
    if (!PINCODE_REGEX.test(pincode)) e.pincode = "Valid Pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ------------------ COUPON LOGIC ------------------ */
  const applyCoupon = (codeOverride) => {
    const codeToTest = codeOverride || couponInput;
    const c = COUPONS.find((x) => x.code === codeToTest.toUpperCase());
    
    if (!c) {
        alert("Invalid Coupon Code");
        setAppliedCoupon(null);
        return;
    }
    
    setAppliedCoupon(c);
    setCouponInput(c.code); // Update input if clicked from list
    setShowCouponsList(false); // Hide list after selection
  };

  // --- CALCULATIONS ---
  const baseAmount = selectedPlan?.priceVal || 0;
  
  // 1. Calculate Discount
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount =
      appliedCoupon.type === "PERCENT"
        ? Math.round((baseAmount * appliedCoupon.value) / 100)
        : appliedCoupon.value;
  }

  // 2. Add-ons
  const ebookCost = addEbook ? EBOOK_PRICE : 0;

  // 3. Taxable Amount (Plan - Discount + Ebook)
  // Assuming Ebook is also taxable and added to net price
  const netTaxablePrice = Math.max(baseAmount - discountAmount, 0) + ebookCost;

  // 4. GST & Total
  const gstAmount = Math.round(netTaxablePrice * GST_RATE);
  const totalAmount = netTaxablePrice + gstAmount;

  /* ------------------ RAZORPAY LOADER ------------------ */
  const loadRazorpay = () =>
    new Promise((resolve) => {
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
    // Attempt to get user details for prefill from local storage if available
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) return alert("Please login first.");

    setLoading(true);
    const ok = await loadRazorpay();
    if (!ok) return alert("Razorpay failed to load");

    try {
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
          name: storedUser.name || "",
          email: storedUser.email || "",
          contact: storedUser.phone || ""
        },
        handler: async (response) => {
          await axios.post(
            "http://localhost:5000/api/transactions/verify",
            {
              ...response,
              planName: selectedPlan.planKey,
              amount: totalAmount,
              amountWithoutGST: netTaxablePrice
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          /* UPDATE LOCAL USER */
          const expiry = new Date();
          expiry.setMonth(expiry.getMonth() + selectedPlan.months);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...storedUser,
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

  /* ------------------ UI RENDER ------------------ */
  return (
    <div className="subscription-page">
      <div className="header-section">
        <h1>Choose Your SKILL3X Plan</h1>
        <p>Unlock your potential with our expert-led courses.</p>
      </div>

      <div className="plans-container">
        {PLANS_DATA.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.theme}`}>
            {plan.isBestValue && <div className="best-value-badge">Best Value</div>}
            
            <div className="card-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3>{plan.title}</h3>
                <p className="subtitle">{plan.subtitle}</p>
            </div>

            <div className="price-section">
                <h2>₹{plan.priceDisplay}</h2>
                <span className="avg-cost">Avg. ₹{plan.avgCost}/month</span>
                {plan.isBestValue && <span className="best-value-text"> — Best Value</span>}
            </div>
            
            <div className="divider"></div>

            <ul className="features-list">
                {plan.features.map((feature, index) => (
                    <li key={index} className={!feature.active ? "disabled" : ""}>
                        <span className="check-icon">{feature.active ? "✓" : "✕"}</span>
                        {feature.text}
                    </li>
                ))}
            </ul>

            <div className="card-footer">
                <button
                className="action-btn"
                onClick={() => {
                    setSelectedPlan(plan);
                    setShowModal(true);
                }}
                >
                {plan.btnText}
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- SIDE PANEL --- */}
      <div className={`side-panel-overlay ${showModal ? "open" : ""}`} onClick={() => setShowModal(false)}></div>
      <div className={`side-panel ${showModal ? "open" : ""}`}>
        {selectedPlan && (
          <div className="panel-content">
            <div className="panel-header">
                <button className="back-btn" onClick={() => setShowModal(false)}>←</button>
                <h2>Bill Summary</h2>
            </div>
            <div className="scrollable-content">
                
                {/* 1. COUPON SECTION */}
                <div className="coupon-section">
                    <div className="coupon-header">
                        <span className="icon">%</span> Apply Coupon
                    </div>
                    <div className="coupon-input-group">
                        <input
                            placeholder="Enter Code"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                        />
                        <button onClick={() => applyCoupon()}>Apply</button>
                    </div>
                    
                    <button 
                        className="view-coupons-btn" 
                        onClick={() => setShowCouponsList(!showCouponsList)}
                    >
                        {showCouponsList ? "Hide Coupons ▲" : "View Available Coupons ▼"}
                    </button>

                    {showCouponsList && (
                        <div className="coupons-list-container">
                            {COUPONS.map((c) => (
                                <div key={c.code} className="coupon-item" onClick={() => applyCoupon(c.code)}>
                                    <div className="code">{c.code}</div>
                                    <div className="desc">{c.desc}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {appliedCoupon && <p className="success-msg">Coupon '{appliedCoupon.code}' Applied! 🎉</p>}
                </div>

                {/* 2. BILLING INPUT (PINCODE ONLY) */}
                <div className="details-section">
                    <h4>Billing Details</h4>
                    <input
                        className={errors.pincode ? "error" : ""}
                        placeholder="Pincode (Required for Tax)"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    />
                     {errors.pincode && <p className="error-text">{errors.pincode}</p>}
                </div>

                {/* 3. ADD-ON (EBOOK) */}
                <div className="addon-section">
                    <label className="checkbox-container">
                        <input 
                            type="checkbox" 
                            checked={addEbook}
                            onChange={() => setAddEbook(!addEbook)}
                        />
                        <span className="checkmark"></span>
                        <div className="addon-text">
                            <span className="addon-title">Add Exclusive E-Books</span>
                            <span className="addon-price">+ ₹{EBOOK_PRICE}</span>
                        </div>
                    </label>
                </div>

                {/* 4. BREAKDOWN */}
                <div className="bill-breakdown">
                    <div className="row">
                        <span>Base Price:</span>
                        <span>₹{baseAmount.toLocaleString()}</span>
                    </div>
                    
                    {discountAmount > 0 && (
                        <div className="row discount">
                            <span>Discount:</span>
                            <span>- ₹{discountAmount.toLocaleString()}</span>
                        </div>
                    )}

                    {addEbook && (
                        <div className="row">
                            <span>E-Books Addon:</span>
                            <span>+ ₹{EBOOK_PRICE}</span>
                        </div>
                    )}

                    <div className="row">
                        <span>Net Taxable Price:</span>
                        <span>₹{netTaxablePrice.toLocaleString()}</span>
                    </div>

                    <div className="row">
                        <span>GST (18%):</span>
                        <span>+ ₹{gstAmount.toLocaleString()}</span>
                    </div>

                    <div className="divider-line"></div>

                    <div className="row total">
                        <span>Net Payable:</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div className="panel-footer">
                <button className="pay-btn" onClick={handlePay} disabled={loading}>
                    {loading ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
                </button>
                <div className="secure-badge">🔒 Secured by Razorpay</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}