import React, { useState, useEffect } from "react";
import "../styles/transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  // 👉 Fetch Transactions from Backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/transactions", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err));
  }, []);

  // 👉 Status Dot Component
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

  // 👉 Function to pick card background color
  const getCardColor = (status) => {
    if (status === "Completed") return "#ecfdf5"; // green
    if (status === "Pending") return "#fffbeb"; // yellow
    return "#fef2f2"; // red (Refunded, Failed)
  };

  return (
    <div className="transactions-wrapper">
      <h2 className="tx-title">My Transactions</h2>

      <div className="transactions-grid">
        {transactions.length === 0 && (
          <p className="no-tx">No transactions found.</p>
        )}

        {transactions.map((t, index) => (
          <div
            key={index}
            className="transaction-card"
            style={{ background: getCardColor(t.status) }}
          >
            <div className="tx-row">
              <span className="tx-label">Transaction ID:</span>
              <span className="tx-value">{t.transactionId}</span>
            </div>

            <div className="tx-row">
              <span className="tx-label">Course Name:</span>
              <span className="tx-value">{t.course}</span>
            </div>

            <div className="tx-row">
              <span className="tx-label">Date:</span>
              <span className="tx-value">
                {new Date(t.createdAt).toLocaleDateString()}
              </span>
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
