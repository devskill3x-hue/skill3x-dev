import { useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";

export default function ChatbotModal({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input
      });

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: res.data.reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "⚠️ Something went wrong." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-overlay">
      <div className="chat-box">
        <div className="chat-header">
          <span>SKILL3X Support</span>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="msg assistant">Typing...</div>}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
