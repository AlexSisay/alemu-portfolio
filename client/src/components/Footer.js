import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Alemu Sisay Nigru</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              AI Researcher and Academic specializing in machine learning, 
              computer vision, and healthcare applications. Passionate about 
              advancing AI technology for social good.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:alemu.nigru@unibs.it"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/alemu-sisay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/alexsisay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/alemu_sisay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/ai-agent" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  AI Agent
                </Link>
              </li>
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Research Areas</h3>
            <ul className="space-y-2">
              <li className="text-secondary-300">Machine Learning</li>
              <li className="text-secondary-300">Computer Vision</li>
              <li className="text-secondary-300">Healthcare AI</li>
              <li className="text-secondary-300">Natural Language Processing</li>
              <li className="text-secondary-300">Data Science</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} Alemu Sisay Nigru. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 