import React from "react";
import "../styles/Dashboard.css"; // 🔗 CSS linked
import Image1 from '../image/1.png';
import skill3x from '../image/skill3x.png';
import HomeBG from "../image/home_bg.jpg";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <>
      <div className="page-wrapper">

        {/* NAVBAR */}
        <header className="topbar">
          <div className="container nav-container">
            <div className="logo">
              <img src={skill3x} alt="Skill3X Logo" className="logo-img" />
            </div>

            <nav className="nav-links" id="navLinks">
              <a href="#hero" className="nav-link active">Home</a>
              <a href="#subscriptions" className="nav-link">Subscriptions</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
              <Link to="/login"><button className="btn btn-outline" id="navSignUp">Log-In</button></Link>
            </nav>

            <button className="nav-toggle" id="navToggle">
              <span></span><span></span><span></span>
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
      <section
        id="hero"
        className="hero"
        style={{ backgroundImage: `url(${HomeBG})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>3X Your Income<br />with AI Tools &amp; Tech Skills</h1>
            <p>
              Learn interview preparation, Excel, web development, data analytics,
              and more to boost your career and income.
            </p>
            <Link to="/signup"> <button className="btn btn-primary" id="heroGetStarted">Join Now</button></Link>
          </div>

          <div className="hero-image">
            <img src={Image1} alt="Skill3X AI & Tech Skills" className="heroImg" />
          </div>
        </div>
      </section>
      
        {/* OFFERINGS SECTION */}
        <section id="offerings" className="offerings">
          <div className="container">
            <div>
              <h2 className="section-title">Our Offerings</h2>
              <p className="section-subtitle">
                Live coaching, powerful tools, and real projects to accelerate your growth.
              </p>
            </div>

            <div className="offer-grid">
              {[
                { icon: "📹", title: "Live Sessions", desc: "1-on-1 interview guidance, and career training." },
                { icon: "3X", title: "Recorded Sessions", desc: "AI tools training, Excel workflows & prompts." },
                { icon: "📘", title: "Handbooks", desc: "Formulas, templates, and learning resources." },
                { icon: "🤖", title: "AI Agents", desc: "Build task automations using real AI apps." },
                { icon: "💡", title: "AI Gems", desc: "Ready-to-use Gems for job and productivity." },
                { icon: "⚙️", title: "Projects", desc: "Web Dev, Data Analytics, SQL & automation." },
                { icon: "📊", title: "Excel Mastery", desc: "Formulas, dashboards & automation tracking." },
                { icon: "🚀", title: "Career Automation", desc: "Resume, LinkedIn & Job AI-accelerated tools." },
              ].map((item, index) => (
                <article key={index} className="offer-card">
                  <div className="offer-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION PLANS */}
        <section id="subscriptions" className="subscriptions">
          <div className="container">
            <div>
              <h2 className="section-title">Subscription Plans</h2>
              <p className="section-subtitle">
                Choose the plan that matches your learning goals — live learning, AI tools, or full career acceleration.
              </p>
            </div>

            <div className="plans-grid">
              {/* Plan 1 */}
              <article className="plan-card">
                <div className="plan-badge">Live 1:1</div>
                <h3>Interview Success Plan</h3>
                <p className="plan-price">₹499 <span>/ session</span></p>
                <ul className="plan-features">
                  <li>8 personalized live 1:1 coaching sessions</li>
                  <li>Mock interviews for HR, Technical & Managerial rounds</li>
                  <li>Resume, LinkedIn & Cover Letter fixing</li>
                  <li>Custom interview answer frameworks (STAR, AIDCCA)</li>
                  <li>Role-based interview training (IT/HR/Analyst/Sales)</li>
                  <li>End-to-end interview preparation roadmap</li>
                  <li>WhatsApp support for doubts</li>
                </ul>
                <button className="btn btn-primary plan-cta">Start Live Coaching</button>
              </article>

              {/* Plan 2 */}
              <article className="plan-card plan-featured">
                <div className="plan-badge best">Most Recommended</div>
                <h3>3X Income AI Program</h3>
                <p className="plan-price">₹1,499 <span>one-time</span></p>
                <ul className="plan-features">
                  <li>AI tools for resume, interview and job search</li>
                  <li>200+ Ready-to-use Business & Productivity Prompts</li>
                  <li>Excel & Google Sheets automations</li>
                  <li>How to use AI for freelancing, side income, and content</li>
                  <li>Job search optimization with AI</li>
                  <li>AI Agents for automation & productivity</li>
                  <li>Lifetime access + Free future updates</li>
                  <li>Certificate of completion</li>
                </ul>
                <button className="btn btn-primary plan-cta">Get 3X Program</button>
              </article>

              {/* Plan 3 */}
              <article className="plan-card">
                <div className="plan-badge">All Access</div>
                <h3>Skill3X Master Bundle</h3>
                <p className="plan-price">₹4,499 <span>complete bundle</span></p>
                <ul className="plan-features">
                  <li>All Live Interview Prep Sessions (1:1 Coaching)</li>
                  <li>3X Income AI Program Access (AI Tools + Prompts)</li>
                  <li>Handbooks: Excel, SQL, AI Tools, Project Templates</li>
                  <li>Tech Projects: Web Dev, SQL, Analytics, AI Automations</li>
                  <li>Portfolio-building projects for job & freelancing</li>
                  <li>Group community access & Peer support</li>
                  <li>Lifetime access + All future updates</li>
                  <li>Best long-term career & income growth plan</li>
                </ul>
                <button className="btn btn-primary plan-cta">Unlock Full Bundle</button>
              </article>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="testimonials">
          <div className="container">
            <div>
              <h2 className="section-title">What Learners Say</h2>
              <p className="section-subtitle">
                Professionals using Skill3X to upgrade skills, crack interviews, and grow income.
              </p>
            </div>

            <div className="testimonials-grid">
              {[
                { name: "Vikas Sharma", role: "HR Executive, Delhi", avatar: "VS", quote: "I used the interview practice... confidence boosting." },
                { name: "Pooja Khanna", role: "Junior Data Analyst, Pune", avatar: "PK", quote: "I am from a non-tech background... friendly way." },
                { name: "Rahul Singh", role: "Freelance Web Developer", avatar: "RS", quote: "Using AI tools and project guidance... side income." },
                { name: "Megha Kapoor", role: "Support to Business Analyst", avatar: "MK", quote: "The career roadmap helped me shift roles in 3 months." },
                { name: "Arjun Joshi", role: "Final Year B.Tech Student", avatar: "AJ", quote: "AI agents helped me complete my final year project." },
                { name: "Shivani Nair", role: "Marketing Professional", avatar: "SN", quote: "AI prompt library saved hours of work!" },
              ].map((t, index) => (
                <article key={index} className="testimonial-card">
                  <div className="avatar">{t.avatar}</div>
                  <h3>{t.name}</h3>
                  <p className="role">{t.role}</p>
                  <p className="quote">{t.quote}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INFO SECTION */}
        <section id="info" className="info-section">
          <div className="container">
            <div>
              <h2 className="section-title">More About Skill3X</h2>
              <p className="section-subtitle">
                Quick links to everything — content, help, and policies.
              </p>
            </div>

            <div className="info-grid">
              {[
                { title: "Blog & Resources", link: "#blog", desc: "Updates, guides, and tips to grow your skills & income." },
                { title: "FAQs", link: "#faqs", desc: "Answers about sessions, access, refunds, and certificates." },
                { title: "Terms & Policies", link: "#terms", desc: "Refund policy, privacy, and learner guidelines." },
                { title: "Help & Support", link: "#support", desc: "Need help? Contact us on email or WhatsApp support." },
                { title: "About Skill3X", link: "#about", desc: "Know about our trainers, mission, and programs." },
                { title: "Feedback", link: "#feedback", desc: "Share your feedback or request custom training." },
              ].map((item, index) => (
                <a key={index} href={item.link} className="info-box">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="info-footer">
        <span>© 2025 Skill3X. All rights reserved.</span>
        <span className="footer-small">Built with 🖤 in INDIA</span>
      </div>
    </>
  );
};

export default Dashboard;
