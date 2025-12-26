import React, { useState } from 'react';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import {
  BiChat,
  BiEnvelope,
  BiPhoneCall,
  BiCreditCard,
  BiCog,
  BiConversation
} from 'react-icons/bi';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import '../styles/HelpCenter.css';

// ✅ IMPORT CHATBOT (new)
import ChatbotModal from '../components/ChatbotModal';

// --- Placeholder Component for FAQ Content ---
const FaqContent = ({ onBack }) => (
  <div className="section-container">
    <button className="back-btn" onClick={onBack}>
      <FiArrowLeft style={{ marginRight: '8px' }} /> Back to Help Center
    </button>
    <h2>Frequently Asked Questions</h2>
    <div className="faq-list">
      <details>
        <summary>How do I reset my password?</summary>
        <p>You can reset your password by going to settings - security - reset password.</p>
      </details>
      <details>
        <summary>Where can I find my billing history?</summary>
        <p>Your billing history is located under the 'Account & Billing' section of your dashboard.</p>
      </details>
      <details>
        <summary>How do I contact support?</summary>
        <p>You can use the Chat, Email, or Phone options at the top of the Help Center page.</p>
      </details>
    </div>
  </div>
);

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState(null);

  // ✅ NEW STATE (logic only)
  const [showChatbot, setShowChatbot] = useState(false);

  // --- Contact Button Handlers ---
  const handleChatClick = () => {
    setShowChatbot(true); // ✅ OPEN CHATBOT
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@example.com';
  };

  const handleCallClick = () => {
    console.log('Call clicked');
  };

  const handleBackClick = () => {
    setActiveSection(null);
  };

  return (
    <div className="help-container">
      {/* --- Header Section --- */}
      <header className="help-header">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={
              activeSection
                ? `Search ${activeSection.toUpperCase()}...`
                : 'How can we help you today?'
            }
          />
          <FiSearch className="search-icon" />
        </div>
      </header>

      <main className="help-content">
        {/* --- Contact Buttons --- */}
        <section className="contact-options">
          <button className="contact-btn" onClick={handleChatClick}>
            <BiChat className="btn-icon" /> <span>Chat with Us</span>
          </button>

          <button className="contact-btn" onClick={handleEmailClick}>
            <BiEnvelope className="btn-icon" /> <span>Email Support</span>
          </button>

          <button className="contact-btn" onClick={handleCallClick}>
            <BiPhoneCall className="btn-icon" /> <span>Call Support</span>
          </button>
        </section>

        {/* --- CONDITIONAL RENDERING --- */}
        {activeSection === 'faqs' ? (
          <FaqContent onBack={handleBackClick} />
        ) : activeSection === 'billing' ? (
          <div className="section-container">
            <button className="back-btn" onClick={handleBackClick}>
              <FiArrowLeft /> Back
            </button>
            <h2>Account & Billing Section</h2>
          </div>
        ) : (
          <section className="topic-grid-container">
            <div className="topic-grid">
              <div className="topic-card" onClick={() => setActiveSection('faqs')}>
                <RiQuestionAnswerLine className="card-icon" />
                <h3>FAQs</h3>
              </div>

              <div className="topic-card" onClick={() => setActiveSection('billing')}>
                <BiCreditCard className="card-icon" />
                <h3>Account & Billing</h3>
              </div>

              <div className="topic-card" onClick={() => setActiveSection('technical')}>
                <BiCog className="card-icon" />
                <h3>Technical Issues</h3>
              </div>

              <div className="topic-card" onClick={() => setActiveSection('forum')}>
                <BiConversation className="card-icon" />
                <h3>Community Forum</h3>
              </div>

              <div className="topic-card fade-out"></div>
              <div className="topic-card fade-out"></div>
            </div>
          </section>
        )}
      </main>

      {/* ✅ CHATBOT MODAL (NO UI CHANGE TO PAGE) */}
      {showChatbot && <ChatbotModal onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default HelpCenter;
