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
  Download,
  Heart,
  Globe,
  Lightbulb
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

              {/* My Story */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-primary-600" />
                  <span>My Story</span>
                </h3>
                <div className="card">
                  <div className="space-y-6 text-secondary-700 leading-relaxed">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">From Rural Ethiopia to AI Research</h4>
                        <p>
                          I was born in Kobo-Robit, a quiet rural town in Ethiopia, where electricity was a distant dream 
                          and clean water a luxury. For most of my childhood, I had never seen a light switch or a glowing screen. 
                          My schoolbooks were read by the flicker of a handmade kerosene lamp—built from a used bottle, a bit of wire, 
                          and a strip of cotton rope. Television, radio, or computers were beyond imagination.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">Guided by Family and Faith</h4>
                        <p>
                          Raised by my deeply spiritual grandmother, Emahoy Mulu Fentabil, I was guided not only by her values 
                          but also by the rhythm of rural life—tending to goats and cattle, praying in silence, and dreaming under the stars. 
                          Her wisdom and the simplicity of rural life shaped my character and instilled in me a deep appreciation for 
                          community and perseverance.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">💍 A New Chapter of Love and Support</h4>
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                          <img
                            src="https://alexsisay.github.io/alemu-portfolio/wedding.jpg"
                            alt="Alemu and Betelehem on their wedding day, smiling and dressed in wedding attire."
                            className="w-full md:w-64 rounded-2xl shadow-lg border border-secondary-200 mb-4 md:mb-0"
                          />
                          <p className="text-secondary-700">
                            On November 17, 2024, I married my beautiful wife Betelehem Dagnaw, my best friend and supporter throughout my journey. 
                            Her unwavering support, understanding, and encouragement have been the foundation that allows me to pursue my dreams 
                            and research with confidence. Together, we continue to build a life that bridges our Ethiopian roots with our global aspirations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">The First Spark of Technology</h4>
                        <p>
                          It wasn't until I moved to the nearby city of Kobo for Grade 11 that I experienced electricity for the first time. 
                          The shift was overwhelming. Suddenly, I could study at night, listen to radio programs, and attend an IT class 
                          that introduced me to a computer. I even mistook a local encyclopedia software for the internet—it took time 
                          to understand what true connectivity meant.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">Academic Excellence and International Journey</h4>
                        <p>
                          Despite financial challenges, cooking with wood and charcoal, and surviving on minimal resources, I persevered. 
                          In 2012, I enrolled at the University of Gondar, where I studied Electrical and Computer Engineering, 
                          specializing in Communication Engineering. After graduating top of my class with a CGPA of 3.89/4.0, 
                          I served as an Assistant Lecturer (2016–2017) and completed a Higher Diploma Certificate in Teaching Methods in 2017.
                        </p>
                        <p className="mt-3">
                          {/* From Africa to Europe section */}
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                              <Globe className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-secondary-800 mb-2">From Africa to Europe</h4>
                              <p>
                                My academic journey took a transformative turn as I moved from Africa to Europe to pursue my MSc. Leaving behind the familiar landscapes of Ethiopia, I embraced the excitement and challenges of studying in a new continent, immersing myself in diverse cultures, languages, and academic environments. This cross-continental experience broadened my perspective and deepened my commitment to global research and collaboration.
                              </p>
                            </div>
                          </div>
                          In 2018, I began a Master's program in Communication Engineering at Addis Ababa Science and Technology University (AASTU), 
                          completing the coursework with a perfect CGPA of 4.00. However, before defending my thesis, I was awarded a scholarship 
                          at Università degli Studi di Brescia, Italy, and chose to pursue an MSc in Communication Technologies and Multimedia.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Code className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">From Europe to AI Research</h4>
                        <p>
                          This program took me across Europe, including a 6-month Erasmus+ exchange at Mid Sweden University, 
                          followed by a thesis-abroad program at the Artificial Intelligence Institute in Ethiopia, where I explored 
                          deep learning methods for neuro-image retrieval. In March 2022, I graduated cum laude (110/110 cum lode) 
                          and began an extraordinary internship at Poliambulatorio Oberdan, an advanced clinic for back pain diagnosis in Brescia.
                        </p>
                        <p className="mt-3">
                          There, I was immersed in therapeutic follow-up, medical image acquisition, segmentation, and diagnostic data analysis. 
                          Inspired by the role of data, I pursued a 6-month Applied Data Science Lab certificate from WorldQuant University, 
                          mastering end-to-end data science workflows.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-secondary-800 mb-2">PhD Journey and Global Impact</h4>
                        <p>
                          In December 2022, I started my Ph.D. in Artificial Intelligence in Medicine at the University of Brescia. 
                          My research focuses on AI-assisted technologies for spine-related pathologies, aiming to enhance clinical 
                          diagnostic workflows. During this journey, I have served as a visiting Ph.D. student at the Center for Digital 
                          Health & Implementation Science (CDHI) in Ethiopia (September – Dec 2024), and at New York University 
                          (April–Oct 2025), where I am contributing to MRI-based spinal pathology grading and domain adaptation research.
                        </p>
                        <p className="mt-3">
                          I've also deepened my academic toolkit through elite programs such as the Oxford Machine Learning Summer School, 
                          IEEE ComSoc eHealth TC Ph.D. School, and Ph.D. School on Statistical Methods & Data Analysis in Medical Research 
                          at the University of Brescia, along with numerous international conferences and online seminars on medical AI and imaging.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border-l-4 border-primary-500">
                      <p className="text-secondary-800 font-medium italic">
                        "From lighting firewood under starry rural skies to programming AI systems in urban research labs, 
                        my story is a bridge between worlds powered by hope, humility, and an unrelenting thirst for knowledge. 
                        I carry the spirit of Kobo-Robit into every model I build and every paper I write, always seeking to 
                        give back to the communities that shaped me."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

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

              {/* Achievements Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Award className="w-6 h-6 text-primary-600" />
                  <span>Achievements</span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-lg border border-primary-200">
                    <span className="text-2xl">🎓</span>
                    <span className="font-medium text-secondary-800">Graduated top of class</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-secondary-50 px-4 py-2 rounded-lg border border-secondary-200">
                    <span className="text-2xl">🌍</span>
                    <span className="font-medium text-secondary-800">Erasmus+ Study Award</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                    <span className="text-2xl">🏆</span>
                    <span className="font-medium text-secondary-800">Thesis Abroad Award</span>
                  </div>
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

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <div className="inline-block bg-primary-100 px-6 py-4 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-2 text-primary-700">Let's Connect!</h3>
                  <p className="text-secondary-700 mb-2">Interested in collaborating, learning more, or just want to say hello?</p>
                  <a
                    href="mailto:alemu.nigru@unibs.it"
                    className="btn-primary inline-flex items-center space-x-2 text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact Me</span>
                  </a>
                </div>
              </div>

              {/* Keep It Updated Note */}
              <div className="mt-8 text-center text-xs text-secondary-400">
                <span>Page regularly updated with new milestones and achievements. Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 