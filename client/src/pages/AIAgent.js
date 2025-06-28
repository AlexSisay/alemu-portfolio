import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Brain, User, Bot, Loader2, Sparkles, Info } from 'lucide-react';

const AIAgent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Alemu's AI assistant. I can answer questions about his academic background, research experience, publications, and professional achievements. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const messagesEndRef = useRef(null);

  // Backend URL - use Render backend in production, local in development
  const BACKEND_URL = process.env.NODE_ENV === 'production' 
    ? 'https://alemu-portfolio-backend.onrender.com'
    : 'http://localhost:5000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check AI provider status on component mount
    const checkAIStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/ai-status`);
        const data = await response.json();
        setAiStatus(data);
      } catch (error) {
        console.error('Error checking AI status:', error);
        setAiStatus({ provider: 'unknown', available: false, fallback: true });
      }
    };
    checkAIStatus();
  }, [BACKEND_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input.trim()
        })
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or contact Alemu directly.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What is Alemu's research focus?",
    "Tell me about Alemu's publications",
    "What are Alemu's technical skills?",
    "What is Alemu's educational background?",
    "What projects has Alemu worked on?",
    "How can I contact Alemu?"
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getProviderInfo = () => {
    if (!aiStatus) return { name: 'Loading...', color: 'text-secondary-500' };
    
    switch (aiStatus.provider) {
      case 'gemini':
        return { name: 'Google Gemini', color: 'text-blue-600' };
      case 'openai':
        return { name: 'OpenAI GPT', color: 'text-green-600' };
      case 'huggingface':
        return { name: 'Hugging Face', color: 'text-yellow-600' };
      default:
        return { name: 'Fallback Mode', color: 'text-orange-600' };
    }
  };

  const providerInfo = getProviderInfo();

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              AI Assistant
            </h1>
          </div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Ask me anything about Alemu's academic background, research experience, 
            publications, or professional achievements. I'm here to help!
          </p>
          
          {/* AI Provider Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-secondary-200"
          >
            <Info className="w-4 h-4 text-secondary-500" />
            <span className="text-sm text-secondary-600">Powered by</span>
            <span className={`text-sm font-medium ${providerInfo.color}`}>
              {providerInfo.name}
            </span>
            {aiStatus?.fallback && (
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                Fallback Mode
              </span>
            )}
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Alemu's AI Assistant</h2>
                  <p className="text-primary-100 text-sm">Powered by {providerInfo.name}</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    aiStatus?.available ? 'bg-green-400' : 'bg-orange-400'
                  } animate-pulse`}></div>
                  <span className="text-sm">
                    {aiStatus?.available ? 'Online' : 'Fallback Mode'}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary-600' 
                        : 'bg-secondary-200'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-secondary-600" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 text-secondary-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-primary-100' : 'text-secondary-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-secondary-600" />
                    </div>
                    <div className="bg-secondary-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-secondary-600" />
                        <span className="text-sm text-secondary-600">Thinking</span>
                        <span className="loading-dots"></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-secondary-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about Alemu's experience..."
                  className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Suggested Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <span>Suggested Questions</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-left p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-secondary-700 hover:text-primary-600"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200"
          >
            <h3 className="text-lg font-semibold text-primary-800 mb-3">
              What I can help you with:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-700">
              <ul className="space-y-2">
                <li>• Academic background and education</li>
                <li>• Research experience and focus areas</li>
                <li>• Publications and papers</li>
              </ul>
              <ul className="space-y-2">
                <li>• Technical skills and expertise</li>
                <li>• Projects and achievements</li>
                <li>• Contact information</li>
              </ul>
            </div>
            
            {/* AI Provider Information */}
            {aiStatus && (
              <div className="mt-4 pt-4 border-t border-primary-200">
                <p className="text-xs text-secondary-600">
                  <strong>AI Provider:</strong> {providerInfo.name}
                  {aiStatus.fallback && (
                    <span className="ml-2 text-orange-600">
                      (Using fallback responses - no API key configured)
                    </span>
                  )}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent; 