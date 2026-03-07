import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Publications from './pages/Publications';
import Dashboard from './pages/Dashboard';
import AIAgent from './pages/AIAgent';

const BACKEND_URL = 'https://alemu-portfolio-backend.onrender.com';

function TrackVisit() {
  const location = useLocation();
  const lastTracked = useRef({ path: '', time: 0 });
  useEffect(() => {
    const path = location.pathname || '/';
    const now = Date.now();
    if (path === lastTracked.current.path && now - lastTracked.current.time < 60000) return;
    lastTracked.current = { path, time: now };
    fetch(`${BACKEND_URL}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    }).catch(() => {});
  }, [location.pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/alemu-portfolio/dashboard';
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <TrackVisit />
      {!isDashboard && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          } />
          <Route path="/publications" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Publications />
            </motion.div>
          } />
          <Route path="/blog" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Blog />
            </motion.div>
          } />
          <Route path="/blog/:id" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPost />
            </motion.div>
          } />
          <Route path="/dashboard" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard />
            </motion.div>
          } />
          <Route path="/ai-agent" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AIAgent />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App; 