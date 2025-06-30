import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code, 
  BookOpen, 
  Users,
  Mail,
  Linkedin,
  Github,
  Download
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = 'https://alemu-portfolio-backend.onrender.com';


const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/profile`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="relative">
                <img
                  src="https://alexsisay.github.io/alemu-portfolio/professnal_photo_2022.jpg"
                  alt="Alemu Sisay Nigru"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-20 blur-xl"></div>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 card">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span>Contact Information</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-secondary-500" />
                    <span className="text-secondary-700">{profile.personal.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-secondary-500" />
                    <span className="text-secondary-700">{profile.personal.location}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <div className="flex space-x-4">
                    <a
                      href={`https://${profile.personal.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://${profile.personal.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="/Alemu Sisay Nigru-resume_June_20_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full CV</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="gradient-text">{profile.personal.name}</span>
                </h1>
                <h2 className="text-2xl text-secondary-600 mb-6">{profile.personal.title}</h2>
                <p className="text-lg text-secondary-700 leading-relaxed">
                  I am a passionate AI researcher and academic with expertise in machine learning, 
                  computer vision, and healthcare applications. My research focuses on developing 
                  innovative AI solutions that address real-world challenges and contribute to 
                  social good.
                </p>
              </div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-primary-600" />
                  <span>Education</span>
                </h3>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="card">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-semibold text-secondary-800">{edu.degree}</h4>
                        <span className="text-sm text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-lg text-primary-600 mb-2">{edu.institution}</p>
                      <p className="text-secondary-600">{edu.focus}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-primary-600" />
                  <span>Professional Experience</span>
                </h3>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="card">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-semibold text-secondary-800">{exp.title}</h4>
                        <span className="text-sm text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-lg text-primary-600 mb-2">{exp.company}</p>
                      <p className="text-secondary-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Code className="w-6 h-6 text-primary-600" />
                  <span>Technical Skills</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {profile.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-white px-4 py-2 rounded-lg border border-secondary-200 text-center hover:border-primary-300 hover:shadow-md transition-all duration-200"
                    >
                      <span className="text-secondary-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Publications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                  <span>Publications</span>
                </h3>
                <div className="space-y-4">
                  {profile.publications.map((pub, index) => (
                    <div key={index} className="card">
                      <h4 className="text-lg font-semibold text-secondary-800 mb-2">
                        {pub.title}
                      </h4>
                      <p className="text-primary-600 mb-1">{pub.journal}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary-500">{pub.year}</span>
                        <span className="text-sm text-primary-600">DOI: {pub.doi}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Award className="w-6 h-6 text-primary-600" />
                  <span>Key Projects</span>
                </h3>
                <div className="space-y-6">
                  {profile.projects.map((project, index) => (
                    <div key={index} className="card">
                      <h4 className="text-xl font-semibold text-secondary-800 mb-3">
                        {project.name}
                      </h4>
                      <p className="text-secondary-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 