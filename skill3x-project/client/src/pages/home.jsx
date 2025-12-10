import React, { useState, useEffect } from "react";
import "../styles/home.css";
import rocket from '../image/rocket.gif';
import courses from '../image/courses.gif';
import {
  FiMenu,
  FiSearch,
  FiHome,
  FiBookOpen,
  FiUser,
  FiCreditCard,
  FiChevronDown,
} from "react-icons/fi";
import Dashboard from "./Dashboard";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [user, setUser] = useState(null);

  // 🔐 Protect this page + load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // not logged in → go to login
      window.location.href = "/Login";
      return;
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser)); // should contain .name from backend
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const faqs = [
    {
      q: "What is the Skill3X Master Webinar?",
      a: "A 60-minute live masterclass on AI tools, career growth & productivity. You can book it at just ₹99.",
    },
    {
      q: "What courses do you offer?",
      a: "Skill3X provides programs on AI tools, interview prep, Excel, data analytics, web development & more.",
    },
    {
      q: "Will I get lifetime access?",
      a: "Yes! All paid courses include lifetime access and free updates.",
    },
    {
      q: "Do you provide certificates?",
      a: "Yes, every Skill3X program includes a verified certificate.",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/Login";
  };

  return (
    <div className="home-wrapper">

      {/* Main Content */}
      <main className="main-content">

        {/* Home Body */}
        <div className="home-container">

          {/* LEFT SECTION */}
          <div className="home-top-row">

            {/* Webinar Card */}
            <div className="webinar-card">
              <div className="webinar-left">
                <h2>Book Master Webinar @ ₹99</h2>
                <p>Attend a live 60-minute masterclass on AI, Career Growth, and Productivity.</p>
                <button className="primary-btn">Book Now</button>
              </div>
              <div className="webinar-right">
                <img src={rocket} alt="webinar" />
              </div>
            </div>

            {/* Courses Card */}
            <div className="courses-card">
              <div className="courses-left">
                <h2>Upgrade Your Career with Our Courses</h2>
                <p>Gain lifetime access to Skill3X programs & step-by-step learning paths.</p>
                <button className="secondary-btn">Explore Courses</button>
              </div>

              <div className="courses-right">
                <img src={courses} alt="courses" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION — FAQ */}
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>

            <div className="faq-list">
              {faqs.map((f, i) => (
                <div key={i} className="faq-item">
                  <div
                    className="faq-question"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <FiChevronDown
                      className={`faq-arrow ${openFAQ === i ? "open" : ""}`}
                    />
                  </div>

                  {openFAQ === i && (
                    <div className="faq-answer">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
