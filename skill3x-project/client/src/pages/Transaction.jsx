import React from "react";
import "../styles/transactions.css";

export default function Transactions() {
  const transactions = [
    {
      id: "TXN10245",
      course: "Prompt Engineering",
      date: "12/12/2025",
      amount: "₹1,999",
      status: "Refunded",
    },
    {
      id: "TXN10455",
      course: "Master Webinar",
      date: "10/12/2025",
      amount: "₹1,499",
      status: "Completed",
    },
    {
      id: "TXN10588",
      course: "Coding with AI",
      date: "05/12/2025",
      amount: "₹999",
      status: "Pending",
    },
    {
      id: "TXN10901",
      course: "Workflow Automation",
      date: "14/12/2025",
      amount: "₹2,499",
      status: "Completed",
    },
  ];

  const StatusDot = ({ status }) => {
    const color =
      status === "Completed"
        ? "#22c55e"
        : status === "Pending"
        ? "#facc15"
        : "#ef4444";

    return (
      <span
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: color,
          marginRight: "6px",
        }}
      />
    );
  };

  return (
    <div className="transactions-wrapper">
      <h2 className="tx-title">My Transactions</h2>

      <div className="transactions-grid">
        {transactions.map((t, index) => (
          <div key={index} className="transaction-card">
            <div className="tx-row">
              <span className="tx-label">Transaction ID:</span>
              <span className="tx-value">{t.id}</span>
            </div>

            <div className="tx-row">
              <span className="tx-label">Course Name:</span>
              <span className="tx-value">{t.course}</span>
            </div>

            <div className="tx-row">
              <span className="tx-label">Date:</span>
              <span className="tx-value">{t.date}</span>
            </div>

            <div className="tx-row">
              <span className="tx-label">Amount:</span>
              <span className="tx-value">{t.amount}</span>
            </div>

            <div className="tx-row">
              <span className="tx-label">Status:</span>
              <span className="tx-status">
                <StatusDot status={t.status} />
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
