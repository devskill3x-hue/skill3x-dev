import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/subscription.css';

// --- CONSTANTS & CONFIG ---
const GST_RATE = 0.18;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const RAZORPAY_KEY_ID = "rzp_test_RsHyO8Jg0oCORq"; // Your Key

const COUPONS = [
  {
    code: "BOOST50",
    label: "Career Boost Wednesday 🎉",
    description: "GET FLAT 50% OFF",
    type: "PERCENT",
    value: 50,
  },
  {
    code: "WELCOME10",
    label: "New User Offer",
    description: "Flat ₹500 OFF",
    type: "FLAT",
    value: 500,
  }
];

const PLANS_DATA = [
  {
    id: "BEGINNER",
    planKey: "BEGINNER", // Backend Key
    title: "Beginner Plan",
    duration: "3-Month Subscription",
    priceDisplay: "5,999",
    priceVal: 5999,
    avg: "Avg. ₹2000/month",
    theme: "blue",
    features: [
      { text: "Full access to Beginner Courses", included: true },
      { text: "2 Live Classes/month", included: true },
      { text: "1 Hands-On Project", included: true },
      { text: "Community access", included: true },
      { text: "Completion certificate", included: true },
      { text: "Life Time Access of Courses", included: true },
      { text: "Premium Gems (AI + Auto)", included: false }
    ],
    btnText: "Get Started",
    isBestValue: false
  },
  {
    id: "PRO",
    planKey: "PRO", // Backend Key
    title: "Pro Plan",
    duration: "6-Month Subscription",
    priceDisplay: "11,999",
    priceVal: 11999,
    avg: "Avg. ₹1999/month",
    theme: "purple",
    features: [
      { text: "Full access to All SKILL3X Courses", included: true },
      { text: "4 Live Classes/month", included: true },
      { text: "2 Hands-On Project", included: true },
      { text: "Community access", included: true },
      { text: "Completion certificate", included: true },
      { text: "Weekly Practice assignments", included: true },
      { text: "Quick Support", included: true }
    ],
    btnText: "Upgrade to Pro",
    isBestValue: true
  },
  {
    id: "CAREER",
    planKey: "CAREER", // Backend Key
    title: "Career Mastery",
    duration: "12-Month Subscription",
    priceDisplay: "16,999",
    priceVal: 16999,
    avg: "Avg. ₹1499/month — Best Value",
    theme: "green",
    features: [
      { text: "Full access to All SKILL3X Courses", included: true },
      { text: "4 Live Classes/month", included: true },
      { text: "2 Hands-On Project", included: true },
      { text: "Premium Gems (AI + Auto)", included: true },
      { text: "Master Projects + Portfolio", included: true },
      { text: "Career Upgrade Tools", included: true },
      { text: "Monthly 1-on-1 Mentorship", included: true }
    ],
    btnText: "Become a Master",
    isBestValue: false
  }
];

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form & Validation State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', pincode: '' });
  const [errors, setErrors] = useState({});

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!showModal) {
      setFormData({ name: '', email: '', phone: '', pincode: '' });
      setErrors({});
      setCouponInput("");
      setAppliedCoupon(null);
    }
  }, [showModal]);

  // --- LOGIC: VALIDATION ---
  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = "Valid email is required";
    if (!PHONE_REGEX.test(formData.phone)) e.phone = "Invalid phone number (10 digits)";
    if (!PINCODE_REGEX.test(formData.pincode)) e.pincode = "Invalid 6-digit pincode";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // --- LOGIC: COUPONS ---
  const applyCoupon = (code) => {
    const coupon = COUPONS.find((c) => c.code.toLowerCase() === code.toLowerCase());
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

  // --- LOGIC: PRICING CALCULATOR ---
  const baseAmount = selectedPlan ? selectedPlan.priceVal : 0;
  
  let discountAmount = 0;
  if (appliedCoupon && baseAmount > 0) {
    if (appliedCoupon.type === "PERCENT") {
      discountAmount = Math.round((baseAmount * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const discountedPrice = Math.max(baseAmount - discountAmount, 0);
  const gstAmount = Math.round(discountedPrice * GST_RATE);
  const totalAmount = discountedPrice + gstAmount;

  // --- LOGIC: RAZORPAY & API ---
  const loadRazorpayScript = () => new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const handlePay = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    const token = localStorage.getItem("token"); // Ensure user is logged in
    
    if(!token) {
        alert("Please login to purchase a plan.");
        setLoading(false);
        return;
    }

    // 1. Load Script
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    try {
      // 2. Create Order on Backend
      const { data } = await axios.post(
        "http://localhost:5000/api/transactions/create-order",
        {
          planKey: selectedPlan.planKey,
          amount: totalAmount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3. Open Razorpay
      const options = {
        key: RAZORPAY_KEY_ID, 
        amount: data.amount, // Amount in paise from backend
        currency: "INR",
        name: "SKILL3X",
        description: `Payment for ${selectedPlan.title}`,
        order_id: data.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: selectedPlan.theme === 'purple' ? '#8B5CF6' : selectedPlan.theme === 'green' ? '#10B981' : '#2563EB'
        },
        handler: async (response) => {
          try {
            await axios.post(
              "http://localhost:5000/api/transactions/verify",
              {
                ...response,
                planKey: selectedPlan.planKey,
                amount: totalAmount,
                amountWithoutGST: discountedPrice,
                couponCode: appliedCoupon?.code || null,
                discountAmount: discountAmount
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Payment Successful 🎉");
            setShowModal(false);
            // Optional: Redirect or reload
            // window.location.href = '/dashboard'; 

          } catch (err) {
            console.error(err);
            alert("Payment verification failed. Please contact support.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    // Clear error for that field
    if(errors[e.target.name]) setErrors({...errors, [e.target.name]: null});
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className="header-title">Choose Your SKILL3X Plan</h1>
        
        <div className="pricing-cards">
          {PLANS_DATA.map((plan) => (
            <div 
              key={plan.id} 
              className={`card ${plan.theme} ${plan.isBestValue ? 'highlight' : ''}`}
            >
              {plan.isBestValue && <div className="badge">Best Value</div>}

              <div className="card-header">
                <div className="icon-area">
                  {plan.theme === 'blue' && <span className="icon">🔰</span>}
                  {plan.theme === 'purple' && <span className="icon">⚡</span>}
                  {plan.theme === 'green' && <span className="icon">🚀</span>}
                </div>
                <h3>{plan.title}</h3>
                <p className="duration">{plan.duration}</p>
              </div>

              <div className="price-block">
                <div className="amount">₹{plan.priceDisplay}</div>
                <div className="avg">{plan.avg}</div>
              </div>

              <div className="divider"></div>

              <ul className="features">
                {plan.features.map((feat, i) => (
                  <li key={i} className={feat.included ? '' : 'muted'}>
                    <span className="mark">{feat.included ? '✓' : '✕'}</span>
                    {feat.text}
                  </li>
                ))}
              </ul>

              <button className="btn-action" onClick={() => handlePlanClick(plan)}>
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- CHECKOUT MODAL --- */}
      {showModal && selectedPlan && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            
            <div className="modal-content">
              {/* LEFT: Course Summary & Math */}
              <div className="modal-left">
                <h3>Order Summary</h3>
                <div className="summary-card">
                    <h4>{selectedPlan.title}</h4>
                    <p className="duration-label">{selectedPlan.duration}</p>
                    <ul className="summary-features">
                        {selectedPlan.features.filter(f => f.included).slice(0, 5).map((feat, i) => (
                             <li key={i}><span>✓</span> {feat.text}</li>
                        ))}
                    </ul>
                </div>

                <div className="cost-breakdown">
                    <div className="cost-row">
                        <span>Base Price:</span>
                        <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="cost-row discount-row">
                          <span>Coupon ({appliedCoupon.code}):</span>
                          <span>− ₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="cost-row">
                        <span>GST (18%):</span>
                        <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="cost-row total">
                        <span>To Pay:</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>
              </div>

              {/* RIGHT: Billing Details & Logic */}
              <div className="modal-right">
                <h3>Billing Details</h3>
                
                <div className="billing-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" name="name" placeholder="John Doe" 
                        value={formData.name} onChange={handleInputChange} 
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" name="email" placeholder="john@example.com" 
                        value={formData.email} onChange={handleInputChange}
                        className={errors.email ? 'input-error' : ''}
                      />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" name="phone" placeholder="9876543210" maxLength={10}
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, "")})}
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label>Pincode</label>
                      <input 
                        type="text" name="pincode" placeholder="123456" maxLength={6}
                        value={formData.pincode} 
                        onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, "")})}
                        className={errors.pincode ? 'input-error' : ''}
                      />
                      {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                    </div>
                    
                    {/* COUPON SECTION */}
                    <div className="coupon-section">
                        <label>Promo Code</label>
                        <div className="coupon-input-group">
                            <input 
                              type="text" 
                              placeholder="Enter Code (e.g. BOOST50)" 
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              disabled={!!appliedCoupon}
                            />
                            {!appliedCoupon ? (
                              <button type="button" className="apply-btn" onClick={() => applyCoupon(couponInput)}>Apply</button>
                            ) : (
                              <button type="button" className="remove-btn" onClick={removeCoupon}>Remove</button>
                            )}
                        </div>
                        {appliedCoupon && <span className="success-text">'{appliedCoupon.code}' applied successfully!</span>}
                        
                        {/* Suggestions */}
                        {!appliedCoupon && (
                          <div className="available-coupons">
                            {COUPONS.map(c => (
                              <div key={c.code} className="coupon-tag" onClick={() => applyCoupon(c.code)}>
                                {c.code}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                </div>

                <div className="payment-section">
                    <button className="pay-now-btn" onClick={handlePay} disabled={loading}>
                        {loading ? 'Processing...' : `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
                    </button>
                    
                    <div className="secure-badge">
                      🔒 Secured by Razorpay
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;