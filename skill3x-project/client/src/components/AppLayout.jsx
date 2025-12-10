// src/components/AppLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { FiMenu, FiHome, FiBookOpen, FiUser, FiCreditCard } from "react-icons/fi";
import logoImg from "../image/skill3x.png";


const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-top">
          <div className="logo-box">
                      <div className="logo-icon">
  <img src={logoImg} alt="Skill3X Logo" />
</div>
                      <span className="logo-text">Skill3X</span>
                  </div>
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="sidebar-menu">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiHome size={20} /> <span>Dashboard</span>
          </NavLink>

          <NavLink  //Courses
            to="/courses" 
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiBookOpen size={20} /> <span>Courses</span>
          </NavLink>

          <NavLink   //Profile
            to="/profile"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiUser size={20} /> <span>Profile</span>
          </NavLink>

          <NavLink   //Transactions
            to="/transactions"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiCreditCard size={20} /> <span>My Transactions</span>
          </NavLink>

          <button className="menu-item logout-btn" onClick={handleLogout}>
            <FiUser size={20} /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* ===== PAGE CONTENT (all pages render here) ===== */}
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
