import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Standard navigation hook
import { FiChevronDown } from "react-icons/fi";
import "../styles/home.css";

// Import your local images here. 
// If these files don't exist, the code will break, so ensure paths are correct.
import rocket from '../image/rocket.gif'; 
import courses from '../image/courses.gif'; 

// --- AI Tools Marquee Component ---
const PopularAiTools = () => {
  const aiTools = [
    {
      name: "ChatGPT",
      icon: "https://cdn-icons-png.flaticon.com/512/12222/12222588.png",
      description: "Conversational AI for answers & coding.",
      link: "https://chat.openai.com/"
    },
    {
      name: "Midjourney",
      icon: "https://cdn-icons-png.flaticon.com/512/12222/12222807.png",
      description: "Generate art from text prompts.",
      link: "https://www.midjourney.com/"
    },
    {
      name: "Canva",
      icon: "https://cdn-icons-png.flaticon.com/512/12222/12222545.png",
      description: "Design graphics with AI tools.",
      link: "https://www.canva.com/"
    },
    {
      name: "Jasper",
      icon: "https://cdn-icons-png.flaticon.com/512/12222/12222661.png",
      description: "Create marketing copy fast.",
      link: "https://www.jasper.ai/"
    },
    {
      name: "Grammarly",
      icon: "https://cdn-icons-png.flaticon.com/512/12222/12222611.png",
      description: "AI writing & grammar assistant.",
      link: "https://www.grammarly.com/"
    },
    {
      name: "Stable Diff.",
      icon: "https://cdn-icons-png.flaticon.com/512/12222/12222901.png",
      description: "Open-source image generation.",
      link: "https://stability.ai/"
    },
    {
        name: "Notion AI",
        icon: "https://cdn-icons-png.flaticon.com/512/12222/12222743.png",
        description: "AI note-taking & writing.",
        link: "https://www.notion.so/product/ai"
    },
    {
        name: "Runway",
        icon: "https://cdn-icons-png.flaticon.com/512/12222/12222874.png",
        description: "AI video editing magic.",
        link: "https://runwayml.com/"
    }
  ];

  return (
    <div className="ai-tools-marquee-container">
      <h3>Popular AI Tools</h3>
      <div className="ai-tools-marquee">
        {/* Duplicating the track content to create the seamless infinite loop */}
        <div className="ai-tools-track">
          {[...aiTools, ...aiTools].map((tool, index) => (
            <a 
              key={index} 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ai-tool-card"
            >
              <div className="ai-tool-header">
                <img src={tool.icon} alt={tool.name} className="ai-tool-icon" />
                <h4>{tool.name}</h4>
              </div>
              <p>{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
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
  }, [navigate]);

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

  const cardData = [
    {
      title: "Our Courses",
      description: "Explore our diverse catalog of skill-based learning paths.",
      btnText: "Browse",
      type: "blue",
      iconImg: "https://cdn-icons-png.flaticon.com/512/3330/3330314.png",
      action: "/courses" 
    },
    {
      title: "Our Subscription",
      description: "Unlock unlimited access to all premium courses & resources.",
      btnText: "View Plans",
      type: "orange",
      iconImg: "https://cdn-icons-png.flaticon.com/512/9473/9473574.png",
      action: "/subscription"
    },
    {
      title: "Our Gems",
      description: "Discover our exclusive collection of UI components & assets.",
      btnText: "See Gems",
      type: "purple",
      iconImg: "https://cdn-icons-png.flaticon.com/512/758/758839.png",
      action: "/GemsPage"
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-wrapper">
      <main className="main-content">
        <div className="home-container">

          {/* Left Section: Banners + Cards */}
          <div className="left-section">
            
            {/* Top Row Banners */}
            <div className="home-top-row">
              <div className="webinar-card">
                <div className="webinar-left">
                  <h2>Book Master Webinar @ ₹99</h2>
                  <p>Attend a live 60-minute masterclass on AI, Career Growth, and Productivity.</p>
                  <button className="primary-btn">Book Now</button>
                </div>
                <div className="webinar-right">
                  {/* Ensure 'rocket' is imported correctly */}
                  <img src={rocket} alt="webinar rocket" />
                </div>
              </div>

              <div className="courses-card">
                <div className="courses-left">
                  <h2>Upgrade Your Career</h2>
                  <p>Gain lifetime access to Skill3X programs.</p>
                  <button className="secondary-btn" onClick={() => navigate('/courses')}>Explore</button>
                </div>
                <div className="courses-right">
                   {/* Ensure 'courses' is imported correctly */}
                  <img src={courses} alt="courses" />
                </div>
              </div>
            </div>

            {/* 3 Clickable Dashboard Cards */}
            <div className="dashboard-cards-grid">
              {cardData.map((card, index) => (
                <div 
                  key={index} 
                  className={`dashboard-card card-${card.type}`}
                  onClick={() => handleCardClick(card.action)}
                >
                  <div className="card-icon-wrapper">
                    <img src={card.iconImg} alt={card.title} className="card-3d-icon" />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button className="btn-card-action">{card.btnText}</button>
                </div>
              ))}
            </div>

          </div> 

          {/* Right Section: FAQ */}
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

        {/* Bottom Section: AI Tools Infinite Marquee */}
        <PopularAiTools />

      </main>
    </div>
  );
}