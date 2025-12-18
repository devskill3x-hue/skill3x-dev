import { useState } from "react";
import "../styles/Subscription.css";
import PaymentModal from "../components/PaymentModal";

const plans = [
  {
    id: "plan_beginner",
    title: "Beginner Plan",
    duration: "3-Month Subscription",
    price: "5,999",
    priceVal: 5999,
    avg: "Avg. ₹2000/month",
    theme: "blue",
    features: [
      { text: "Full access to All SKILL3X Courses", included: true },
      { text: "2 Live Classes/month", included: true },
      { text: "1 Hands-On Project", included: true },
      { text: "Community access", included: true },
      { text: "Completion certificate", included: true },
      { text: "Life Time Access of Courses", included: true },
      { text: "Premium Gems (AI + Auto)", included: false },
    ],
    btnText: "Get Started",
    isBestValue: false,
  },
  {
    id: "plan_pro",
    title: "Pro Plan",
    duration: "6-Month Subscription",
    price: "11,999",
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
      { text: "Quick Support", included: true },
    ],
    btnText: "Upgrade to Pro",
    isBestValue: true,
  },
  {
    id: "plan_mastery",
    title: "Career Mastery",
    duration: "12-Month Subscription",
    price: "16,999",
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
    ],
    btnText: "Become a Master",
    isBestValue: false,
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="subscription-container">
      <h1 className="title">Choose Your Subscription</h1>

      <div className="plans">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.theme} ${
              plan.isBestValue ? "best-value" : ""
            }`}
          >
            {plan.isBestValue && (
              <div className="badge">Best Value</div>
            )}

            <h2>{plan.title}</h2>
            <p className="duration">{plan.duration}</p>

            <h3 className="price">₹{plan.price}</h3>
            <p className="avg">{plan.avg}</p>
            <p className="note">(GST applicable at checkout)</p>

            <ul className="features">
              {plan.features.map((f, i) => (
                <li key={i} className={f.included ? "yes" : "no"}>
                  {f.included ? "✔" : "✖"} {f.text}
                </li>
              ))}
            </ul>

            <button onClick={() => setSelectedPlan(plan)}>
              {plan.btnText}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
