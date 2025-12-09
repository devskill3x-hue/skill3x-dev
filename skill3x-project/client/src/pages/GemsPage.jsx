// src/pages/GemsPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/gems.css";  // NEW or REVISED styles for Gems specific content
import { FiMenu, FiSearch, FiLogOut } from "react-icons/fi"; // Re-introducing FiLogOut for styling

// --- Icon Placeholder Component (for consistency) ---
const IconPlaceholder = ({ iconContent, size = 24 }) => (
  <div
    style={{
      fontSize: `${size}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      fontWeight: 500
    }}
  >
    {iconContent}
  </div>
);
// ---------------------------------

const gemData = [
  {
    title: "Career Guide",
    description: "Get personalized advice, interview prep, and career pathing assistance.",
    url: "https://gemini.google.com/gem/career-guide",
    icon: "💼", // Briefcase/Career
    color: "#a855f7", // Purple/Violet
    bg: "linear-gradient(135deg, #c084fc, #a855f7)",
  },
  {
    title: "Coding Partner Gem",
    description: "Your expert pair programmer for debugging, code generation, and learning new concepts.",
    url: "https://gemini.google.com/gem/coding-partner",
    icon: "💻", // Laptop/Code
    color: "#3b82f6", // Blue
    bg: "linear-gradient(135deg, #60a5fa, #3b82f6)",
  },
  {
    title: "Learning Coach Gem",
    description: "Study assistant that breaks down complex topics and creates customized learning plans.",
    url: "https://gemini.google.com/gem/learning-coach",
    icon: "🎓", // Graduation Cap/Learning
    color: "#10b981", // Green
    bg: "linear-gradient(135deg, #4ade80, #10b981)",
  },
  {
    title: "Human-Written Article Prompt Gem",
    description: "Advanced prompting for generating high-quality, human-like articles and content.",
    url: "https://gemini.google.com/gem/245068a0e197",
    icon: "✍️", // Writing hand/Article
    color: "#ef4444", // Red
    bg: "linear-gradient(135deg, #f87171, #ef4444)",
  },
];

const GemCard = ({ gem }) => (
  <a
    href={gem.url}
    target="_blank"
    rel="noopener noreferrer"
    className="gem-card"
  >
    <div className="gem-icon-container" style={{ background: gem.bg }}>
      <IconPlaceholder iconContent={gem.icon} size={36} />
    </div>
    <div className="gem-content">
      <h3 className="gem-title">{gem.title}</h3>
      <p className="gem-description">{gem.description}</p>
      <span className="gem-link-text" style={{ color: gem.color }}>
        Go to Gem →
      </span>
    </div>
  </a>
);


export default function GemsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Authentication logic...
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Topbar component matching the image layout
  const Topbar = () => (
    <header className="topbar">
      <div className="profile-area">
        <div className="profile-name">S3</div> {/* Added S3 name/logo placeholder */}
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="avatar"
        />
      </div>
    </header>
  );

  return (
    <div className="home-wrapper">

      {/* Sidebar - Matching Image Sidebar */}
      {/* Main Content */}
      <main className="main-content">
        <Topbar />

        <div className="gems-container">
          <h2 className="gems-main-title">Explore Our Gemini Gems</h2>
          <p className="gems-subtitle">Direct links to specialized, highly effective AI companions to boost your career and productivity.</p>

          <div className="gems-grid">
            {gemData.map((gem, index) => (
              <GemCard key={index} gem={gem} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}