import React, { useState } from 'react';
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

// --- Icons (Same as before) ---
const Mail = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const Lock = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const ArrowRight = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const Eye = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOff = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
);
const Loader2 = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
const ShieldCheck = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
const Zap = ({ size = 24, className = "", fill = "none", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const TrendingUp = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);

// --- Sub-Components ---

const Skill3XLogo = ({ variant = 'dark' }) => (
  <div className={`auth-logo-container ${variant}`}>
    <div className="auth-logo-icon-wrapper">
      <Zap size={22} fill="currentColor" />
    </div>
    <span className="auth-logo-text">
      Skill<span className="auth-logo-highlight">3X</span>
    </span>
  </div>
);

const InputField = ({ label, type, placeholder, icon: Icon, value, onChange, name, showPasswordToggle, onTogglePassword, isPasswordVisible, error }) => (
  <div className={`auth-input-group ${error ? 'has-error' : ''}`}>
    <label className="auth-input-label">{label}</label>
    <div className="auth-input-wrapper">
      <div className="auth-input-icon">
        <Icon size={18} />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="auth-form-input"
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="auth-password-toggle"
          aria-label="Toggle password visibility"
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="auth-feature-item">
    <div className="auth-feature-icon-box">
      <Icon size={20} />
    </div>
    <div className="auth-feature-content">
      <h3 className="auth-feature-title">{title}</h3>
      <p className="auth-feature-desc">{desc}</p>
    </div>
  </div>
);

// --- Main Component ---

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Login successful! Redirecting...");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setTimeout(() => {
            navigate("/home", { replace: true });
        }, 1000);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server connection failed. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        
        {/* Left Side - Brand/Marketing (Renamed from hero-section) */}
        <div className="auth-hero-section">
          {/* Background Elements */}
          <div className="auth-bg-blob auth-blob-1" />
          <div className="auth-bg-blob auth-blob-2" />
          <div className="auth-bg-grid" />

          {/* 1. Logo at Top Left */}
          <div className="auth-hero-top">
            <Skill3XLogo variant="light" />
          </div>

          {/* 2. Main Content */}
          <div className="auth-hero-middle">
            <div className="auth-hero-text">
              <h1>
                Master your craft.<br />
                <span className="auth-gradient-text">
                  Elevate your future.
                </span>
              </h1>
              <p>
                Join 50,000+ professionals using Skill3X to track growth, assess skills, and land their dream careers.
              </p>
            </div>

            <div className="auth-features-list">
              <FeatureItem 
                icon={TrendingUp} 
                title="Analytics Dashboard" 
                desc="Track your skill progression with AI-driven insights." 
              />
              <FeatureItem 
                icon={ShieldCheck} 
                title="Verified Certifications" 
                desc="Get industry-recognized badges that validate your expertise." 
              />
            </div>
          </div>

          {/* 3. Footer */}
          <div className="auth-hero-footer">
            <span>© 2025 Skill3X Inc.</span>
            <div className="auth-footer-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="auth-form-section">
          <div className="auth-mobile-logo">
            <Skill3XLogo variant="dark" />
          </div>

          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>Welcome back</h2>
              <p>Enter your credentials to access your workspace.</p>
            </div>

            <form onSubmit={handleLogin} className="auth-main-form">
              {error && (
                <div className="auth-alert-box error">
                  <span className="auth-alert-icon">!</span> {error}
                </div>
              )}
              {successMsg && (
                 <div className="auth-alert-box success">
                   <span className="auth-alert-icon">✓</span> {successMsg}
                 </div>
              )}

              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="name@company.com"
                icon={Mail}
                value={formData.email}
                onChange={handleInputChange}
                error={error && !formData.email}
              />

              <div className="auth-password-group">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.password}
                  onChange={handleInputChange}
                  showPasswordToggle={true}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  isPasswordVisible={showPassword}
                  error={error && !formData.password}
                />
                <div className="auth-forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="auth-submit-btn">
                {isLoading ? (
                  <>
                    <Loader2 className="auth-spinner" size={20} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <div className="auth-divider-text"><span>Or continue with</span></div>
            </div>

            <div className="auth-social-buttons">
              <button className="auth-social-btn google" type="button">
                <svg className="auth-social-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="auth-social-btn github" type="button">
                <svg className="auth-social-icon" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                Github
              </button>
            </div>

            <div className="auth-toggle-link">
              <p>Don't have an account yet? <Link to="/Signup">Sign up for free</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}