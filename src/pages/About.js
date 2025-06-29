import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Award, BookOpen, Mail, Linkedin, Github } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = 'https://alemu-portfolio-backend.onrender.com';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/profile`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {/* Rest of the component code */}
    </div>
  );
};

export default About; 