import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';
import chatbotLogo from '../assets/chatbot-logo.png';

const Chatbot = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your YouTube assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you with YouTube channel information. What would you like to know?";
    } else if (lowerMessage.includes('video') || lowerMessage.includes('content')) {
      return "I can help you understand video content, analytics, and channel performance. What specific information are you looking for?";
    } else if (lowerMessage.includes('subscriber') || lowerMessage.includes('stats')) {
      return "I can provide insights about subscriber growth, engagement metrics, and channel statistics. Would you like me to analyze the current channel?";
    } else if (lowerMessage.includes('help')) {
      return "I can assist with:\n• Channel analytics\n• Video performance insights\n• Content recommendations\n• Subscriber engagement tips\n\nWhat interests you most?";
    } else {
      return "That's an interesting question! I'm here to help with YouTube channel insights and analytics. Could you be more specific about what you'd like to know?";
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : 'maximized'}`}>
      {/* Chatbot Header */}
      <div className="chatbot-header" onClick={toggleMinimize}>
        <div className="chatbot-avatar">
          <img
            src={chatbotLogo}
            alt="Chatbot"
            className="chatbot-logo"
          />
        </div>
        <div className="chatbot-info">
          <h4>YouTube Assistant</h4>
          <span className="status">Online</span>
        </div>
        <button className="minimize-btn" onClick={(e) => { e.stopPropagation(); toggleMinimize(); }}>
          {isMinimized ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-btn" disabled={!inputMessage.trim()}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;
