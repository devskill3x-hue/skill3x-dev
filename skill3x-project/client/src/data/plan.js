export const PLANS = [
  {
    id: "BEGINNER", // 🔑 internal plan key
    title: "Beginner Plan",
    duration: "3-Month Subscription",
    price: 5999,
    priceDisplay: "₹5,999",
    features: [
      "Access to Beginner Courses",
      "2 Live Classes / Month",
      "1 Hands-on Project",
      "Community Access",
      "Completion Certificate"
    ],
    buttonText: "Get Started"
  },

  {
    id: "PRO",
    title: "Pro Plan",
    duration: "6-Month Subscription",
    price: 11999,
    priceDisplay: "₹11,999",
    features: [
      "All Courses Access",
      "4 Live Classes / Month",
      "2 Hands-on Projects",
      "Weekly Assignments",
      "Quick Support"
    ],
    buttonText: "Upgrade to Pro",
    bestValue: true
  },

  {
    id: "CAREER",
    title: "Career Mastery",
    duration: "12-Month Subscription",
    price: 16999,
    priceDisplay: "₹16,999",
    features: [
      "All Courses + Premium Gems",
      "Master Projects + Portfolio",
      "Career Tools",
      "1-on-1 Mentorship"
    ],
    buttonText: "Become a Master"
  }
];
