import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, BookOpen, Award, User, Brain, Code, Database, TrendingUp } from 'lucide-react';

const BACKEND_URL = 'https://alemu-portfolio-backend.onrender.com';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/dashboard`);
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default Dashboard; 