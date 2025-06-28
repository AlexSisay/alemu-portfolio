import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/blog');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post =>
        post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, posts]);

  const allTags = ['all', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Insights, research updates, and thoughts on AI, machine learning, and academic life.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-secondary-100 border border-secondary-200'
                  }`}
                >
                  {tag === 'all' ? 'All Posts' : tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 group"
            >
              {/* Post Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl text-primary-400">📝</div>
              </div>

              {/* Post Meta */}
              <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              </div>

              {/* Post Title */}
              <h2 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                {post.title}
              </h2>

              {/* Post Excerpt */}
              <p className="text-secondary-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform duration-200"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              No posts found
            </h3>
            <p className="text-secondary-600">
              Try adjusting your search terms or filters.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Get notified about new blog posts, research updates, and AI insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-secondary-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog; 