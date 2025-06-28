import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Code, 
  Award,
  Calendar,
  Target,
  Activity,
  PieChart
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Publications",
      value: analytics?.totalPublications || 0,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Projects",
      value: analytics?.totalProjects || 0,
      icon: Code,
      color: "from-green-500 to-green-600",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Years Experience",
      value: analytics?.yearsOfExperience || 0,
      icon: Award,
      color: "from-purple-500 to-purple-600",
      change: "+1",
      changeType: "positive"
    },
    {
      title: "Blog Posts",
      value: analytics?.blogPosts || 0,
      icon: Users,
      color: "from-orange-500 to-orange-600",
      change: "+3",
      changeType: "positive"
    }
  ];

  const researchAreas = analytics?.researchAreas || [];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Overview of academic achievements, research metrics, and professional growth.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-secondary-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Research Areas Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-semibold text-secondary-800">Research Areas</h3>
            </div>
            <div className="space-y-4">
              {researchAreas.map((area, index) => {
                const percentage = Math.floor(Math.random() * 30) + 20; // Mock data
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-secondary-700 font-medium">{area}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-secondary-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-secondary-600 w-8">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-semibold text-secondary-800">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {[
                { action: "Published new research paper", time: "2 days ago", type: "publication" },
                { action: "Completed AI project milestone", time: "1 week ago", type: "project" },
                { action: "Presented at conference", time: "2 weeks ago", type: "presentation" },
                { action: "Started new research collaboration", time: "1 month ago", type: "collaboration" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-secondary-800 font-medium">{activity.action}</p>
                    <p className="text-sm text-secondary-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Goals and Targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card mb-12"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-semibold text-secondary-800">Goals & Targets</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { goal: "Research Papers", current: 5, target: 10, icon: BookOpen },
              { goal: "Conference Presentations", current: 3, target: 8, icon: Users },
              { goal: "Collaborations", current: 2, target: 5, icon: Award }
            ].map((item, index) => {
              const progress = (item.current / item.target) * 100;
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-secondary-800 mb-2">{item.goal}</h4>
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {item.current}/{item.target}
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-secondary-600 mt-2">{Math.round(progress)}% Complete</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: "Add Publication", icon: BookOpen, color: "from-blue-500 to-blue-600" },
            { title: "Update Profile", icon: Users, color: "from-green-500 to-green-600" },
            { title: "New Project", icon: Code, color: "from-purple-500 to-purple-600" },
            { title: "Schedule Meeting", icon: Calendar, color: "from-orange-500 to-orange-600" }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="card hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors duration-200">
                  {action.title}
                </h3>
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 