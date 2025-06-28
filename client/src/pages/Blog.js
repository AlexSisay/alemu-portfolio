import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BACKEND_URL = 'https://alemu-portfolio-backend.onrender.com';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/blog`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 pt-20">
        <div className="container-max section-padding">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-secondary-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="h-48 bg-secondary-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-secondary-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-secondary-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-secondary-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-secondary-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 pt-20">
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Research Blog
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Exploring the latest developments in AI, machine learning, and their applications in healthcare and beyond.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{post.title.charAt(0)}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-secondary-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
              No blog posts yet
            </h3>
            <p className="text-secondary-600">
              Check back soon for research updates and insights!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog; 