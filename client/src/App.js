import React, { useEffect } from 'react';
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

function TrackVisit() {
  const location = useLocation();

  // Google Analytics 4 (free tier) for SPA page tracking.
  useEffect(() => {
    const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
    if (!measurementId) return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    const existingScript = document.querySelector('script[data-analytics-provider="ga4"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.setAttribute('data-analytics-provider', 'ga4');
      document.head.appendChild(script);

      window.gtag('js', new Date());
      // Disable automatic first pageview so SPA route tracking is consistent.
      window.gtag('config', measurementId, { send_page_view: false });
    }

    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title
    });
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