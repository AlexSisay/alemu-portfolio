import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Brain, 
  Code, 
  Database, 
  TrendingUp,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';

const Home = () => {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch('/api/cv');
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchCVData();
  }, []);

  const stats = [
    { icon: Brain, label: 'Research Papers', value: '15+' },
    { icon: Code, label: 'Projects', value: '25+' },
    { icon: Database, label: 'Datasets', value: '8' },
    { icon: TrendingUp, label: 'Years Experience', value: '5+' }
  ];

  const skills = [
    { name: 'Machine Learning', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'Deep Learning', level: 88 },
    { name: 'Computer Vision', level: 85 },
    { name: 'Data Science', level: 82 },
    { name: 'TensorFlow/PyTorch', level: 80 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-medium text-primary-600">AI Researcher & Academic</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
                Hi, I'm{' '}
                <span className="gradient-text">Alemu Sisay Nigru</span>
              </h1>
              
              <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
                Passionate AI researcher specializing in machine learning, computer vision, 
                and healthcare applications. Currently pursuing my academic journey while 
                contributing to cutting-edge research projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="/Alemu%20Sisay%20Nigru-resume.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://github.com/alexsisay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/alemu-sisay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:alemu.nigru@unibs.it"
                  className="text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

            {/* Right Content - Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 p-2">
                  <div className="w-full h-full rounded-full bg-white p-4 flex items-center justify-center">
                    <img
                      src="/alemu.jpg"
                      alt="Alemu Sisay Nigru"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Current Position Section */}
      {cvData && (
        <section className="py-16">
          <div className="container-max section-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <div className="text-sm opacity-90">Current Location</div>
                    <div className="font-semibold">{cvData.currentPosition.location}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <div className="text-sm opacity-90">Since</div>
                    <div className="font-semibold">{cvData.currentPosition.startDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="text-sm opacity-90">Position</div>
                    <div className="font-semibold">{cvData.currentPosition.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Expertise in modern AI/ML technologies and frameworks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-secondary-900">{skill.name}</span>
                  <span className="text-sm text-secondary-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Ready to Connect?
            </h2>
            <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
              Let's discuss research opportunities, collaborations, or just have a chat about AI and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-agent"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Brain className="w-4 h-4 mr-2" />
                Chat with AI Agent
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors font-medium"
              >
                Learn More About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 