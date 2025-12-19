import React from 'react';
import { Link } from 'react-router-dom'; // IMPORT ADDED
import '../styles/Dashboard.css';

// Placeholder images
const HeroImage = "https://cdn.pixabay.com/photo/2025/09/16/10/52/online-meeting-9837686_640.png"; 
const UserAvatar1 = "https://placehold.co/50?text=AP";
const UserAvatar2 = "https://placehold.co/50?text=RK";
const UserAvatar3 = "https://placehold.co/50?text=PS";

function Dashboard() {
  return (
    <div className="app-container">
      
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-img-placeholder">⚡</span> 
            <span className="logo-text">Skill3X</span>
          </div>
          <div className="nav-buttons">
            {/* UPDATED: Changed buttons to Links */}
            <Link to="/Login" className="btn-outline">Login</Link>
            <Link to="/Signup" className="btn-dark">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* --- SECTION 1: HERO --- */}
      <header className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Unlock Your Potential with Skill3X.</h1>
            <p>
              Master in-demand skills with our world-class courses,
              hands-on projects, and expert-led live sessions. Start
              your journey today.
            </p>
            <div className="hero-cta">
              {/* Note: You can link these too if you have pages for them */}
              <Link to="/home"  className="btn-primary">Get Started for Free</Link>
              <Link to="/Courses" className="btn-outline-blue">Explore Courses</Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img src={HeroImage} alt="Students learning" />
          </div>
        </div>
      </header>

      {/* --- SECTION 3: FEATURES --- */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Skill3X?</h2>
            <p>We combine cutting-edge curriculum with practical application to ensure you become job-ready.</p>
          </div>
          
          <div className="grid-3">
            {/* Feature 1 */}
            <div className="card feature-card">
              <div className="icon-box blue-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
              </div>
              <h3>Expert-Led Live Classes</h3>
              <p>Learn directly from industry veterans through interactive live sessions. Get your doubts resolved in real-time.</p>
            </div>

            {/* Feature 2 */}
            <div className="card feature-card">
              <div className="icon-box orange-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3>Hands-on Projects</h3>
              <p>Build a robust portfolio with real-world capstone projects. Apply your theoretical knowledge to solve practical challenges.</p>
            </div>

            {/* Feature 3 */}
            <div className="card feature-card">
              <div className="icon-box purple-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path></svg>
              </div>
              <h3>Career Acceleration</h3>
              <p>Get dedicated placement support, resume building workshops, and mock interviews to land your dream job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: TESTIMONIALS --- */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Learners Say</h2>
            <p>Hear from our successful graduates who transformed their careers.</p>
          </div>

          <div className="grid-3">
            {/* Testimonial 1 */}
            <div className="card testimonial-card">
              <div className="quote-icon">“</div>
              <p className="review-text">Skill3X's project-based learning was a game-changer. I built a real portfolio that got me hired at a top tech company.</p>
              <div className="user-profile">
                <img src={UserAvatar1} alt="Anjali P." />
                <div>
                  <h4>Anjali P.</h4>
                  <span>Frontend Developer at Adobe</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card testimonial-card">
              <div className="quote-icon orange-quote">“</div>
              <p className="review-text">The live mentorship is incredible. Having industry experts guide me through complex topics made all the difference.</p>
              <div className="user-profile">
                <img src={UserAvatar2} alt="Rahul K." />
                <div>
                  <h4>Rahul K.</h4>
                  <span>Data Analyst at Amazon</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card testimonial-card">
              <div className="quote-icon purple-quote">“</div>
              <p className="review-text">From zero coding knowledge to a full-time job in 6 months. The career support team is amazing!</p>
              <div className="user-profile">
                <img src={UserAvatar3} alt="Priya S." />
                <div>
                  <h4>Priya S.</h4>
                  <span>UX Designer at Microsoft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="info-bar-section">
        <div className="container">
          <div className="info-grid">
            
            {/* Brand Column */}
            <div className="info-col brand-col">
              <div className="info-logo">
                <div className="triangles">
                  <span>▲</span><span>▲</span><span>▲</span>
                </div> 
                <div className="info-logo-text">
                  <span>Skill3X</span>
                </div>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="info-col">
              <h5>Company</h5>
              <ul>
                <li>Terms & Conditions</li>
                <li>About us</li>
                <li>Teach with Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="info-col">
              <h5>For Learners</h5>
              <ul>
                {/* UPDATED: Login Link */}
                <li><Link to="/login" className="footer-link">Login</Link></li>
              </ul>
            </div>

            {/* Social Column */}
            <div className="info-col">
              <h5>Connect with us</h5>
              <div className="social-icons">
                <span className="icon">📷</span>
                <span className="icon">📘</span>
                <span className="icon">in</span>
              </div>
            </div>
            
            {/* Decorative Side Triangles */}
            <div className="decor-triangles">
              <div className="triangle"></div>
              <div className="triangle"></div>
              <div className="triangle"></div>
            </div>

          </div>
          
          <div className="info-bottom">
            <p>Business Legal Name – Skill3X</p>
            <p>© 2025 Skill3X. All Rights Reserved by Skill3X.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;