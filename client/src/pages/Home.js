import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Brain, 
  Code, 
  BookOpen, 
  BarChart3, 
  MessageCircle,
  Download,
  ExternalLink
} from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, analyticsRes] = await Promise.all([
          axios.get('/api/profile'),
          axios.get('/api/dashboard')
        ]);
        setProfile(profileRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Research",
      description: "Leading-edge research in machine learning and artificial intelligence applications",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Code,
      title: "Technical Expertise",
      description: "Deep knowledge in Python, TensorFlow, PyTorch, and modern AI frameworks",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Published research papers and contributions to the AI community",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: BarChart3,
      title: "Data Science",
      description: "Comprehensive experience in data analysis and statistical modeling",
      color: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { label: "Publications", value: analytics?.totalPublications || 0 },
    { label: "Projects", value: analytics?.totalProjects || 0 },
    { label: "Years Experience", value: analytics?.yearsOfExperience || 0 },
    { label: "Blog Posts", value: analytics?.blogPosts || 0 }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Alemu Sisay Nigru</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-secondary-600 mb-6">
                AI Researcher & Academic
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Passionate about advancing artificial intelligence for social good. 
                Specializing in machine learning, computer vision, and healthcare applications. 
                Committed to research excellence and knowledge sharing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ai-agent"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with AI Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="/Alemu Sisay Nigru-resume_June_20_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="/alemu.jpg"
                  alt="Alemu Sisay Nigru"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}+
                </div>
                <div className="text-secondary-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Areas of Expertise
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              My research and professional experience spans across multiple domains 
              in artificial intelligence and data science.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Connect?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let's discuss research opportunities, collaborations, or simply chat about AI and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Learn More About Me</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/ai-agent"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <span>Ask AI Assistant</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 