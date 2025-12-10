import React, { useState, useEffect } from "react";
import "../styles/Courses.css";
import { Link, useNavigate } from "react-router-dom";

/* ---------- ICON PLACEHOLDER ---------- */
const IconPlaceholder = ({ iconContent, size = 24 }) => (
  <div
    style={{
      fontSize: `${size}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    }}
  >
    {iconContent}
  </div>
);

/* ---------- COURSE CARD ---------- */
const CourseCard = ({ course }) => {
  let iconComponent = <IconPlaceholder iconContent="📊" size={32} />;
  let iconBackground = "linear-gradient(135deg, #a5b4fc, #818cf8)";
  let cardBackground = "#f5f3ff";

  if (course.id === "prompt-engineering") {
    iconBackground = "linear-gradient(135deg, #60a5fa, #3b82f6)";
    iconComponent = <IconPlaceholder iconContent="⚙️" size={32} />;
    cardBackground = "#eef2ff";
  } else if (course.id === "image-video") {
    iconBackground = "linear-gradient(135deg, #c084fc, #a855f7)";
    iconComponent = <IconPlaceholder iconContent="🖼️" size={32} />;
    cardBackground = "#f5f3ff";
  } else if (course.id === "workflow-automation") {
    iconBackground = "linear-gradient(135deg, #4ade80, #10b981)";
    iconComponent = <IconPlaceholder iconContent="⏱️" size={32} />;
    cardBackground = "#e0fbe7";
  } else if (course.id === "code-with-ai") {
    iconBackground = "linear-gradient(135deg, #fbbf24, #f59e0b)";
    iconComponent = <IconPlaceholder iconContent="💻" size={32} />;
    cardBackground = "#fffbeb";
  } else if (course.id === "monetize-career") {
    iconBackground = "linear-gradient(135deg, #f87171, #ef4444)";
    iconComponent = <IconPlaceholder iconContent="📈" size={32} />;
    cardBackground = "#fef2f2";
  } else if (course.id === "gems") {
    iconComponent = <IconPlaceholder iconContent="💎" size={32} />;
  }

  return (
    <div className="course-card" style={{ background: cardBackground }}>
      <div className="course-card-top">
        <div
          className="course-icon-container"
          style={{ background: iconBackground }}
        >
          {iconComponent}
        </div>
      </div>

      <h3 className="course-title">{course.title}</h3>
      <p className="course-author">By {course.author}</p>

      {course.description && (
        <p className="course-description">{course.description}</p>
      )}

      <div className="card-spacer" />

      <button className="course-action-btn">
        {course.progress > 0 ? "Continue" : "Start"}
      </button>
    </div>
  );
};

/* ---------- MAIN HOME ---------- */
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("User parse error");
      }
    }
  }, [navigate]);

  /* ---------- COURSES DATA ---------- */
  const subscribedCourses = [
    { id: "prompt-engineering", title: "Prompt Engineering", author: "AI Experts" },
    { id: "image-video", title: "Image and Video (Ads Content Generator)", author: "Creative AI" },
    { id: "workflow-automation", title: "Workflow Automation using AI Agents", author: "Tech Automators" },
    { id: "code-with-ai", title: "Code with AI", author: "Dev Gurus" },
    { id: "monetize-career", title: "Monetize your Career", author: "Career Coaches" },
    { id: "gems", title: "Explore Our Gems", author: "Gemini" },
  ];


  /* ---------- SEARCH FILTER ---------- */
  const filteredCourses = subscribedCourses.filter((course) =>
    (course.title + course.author)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      {/* ---------- SIDEBAR ---------- */}
   

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="main-content">
        {/* ---------- TOPBAR ---------- */}
        <header className="topbar">
          <div />
          <div className="profile-area">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="avatar"
            />
            <div className="notification-dot" />
          </div>
        </header>

        {/* ---------- COURSES BODY ---------- */}
        <div className="courses-container">
          <div className="courses-header">
            <h2>My Courses</h2>
          </div>

   
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}