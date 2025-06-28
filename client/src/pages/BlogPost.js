import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  BookOpen,
  Clock,
  MessageCircle
} from 'lucide-react';
import axios from 'axios';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-800 mb-4">Post not found</h1>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimatedReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-max section-padding">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-secondary-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{estimatedReadingTime(post.content)} min read</span>
              </div>
            </div>

            <p className="text-xl text-secondary-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mb-8 flex items-center justify-center">
            <div className="text-6xl text-primary-400">📝</div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-secondary-700 leading-relaxed space-y-6">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  Share this post
                </h3>
                <p className="text-secondary-600">
                  Help others discover this content
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="p-3 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-secondary-100 text-secondary-600 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for related posts */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="card hover:shadow-xl transition-all duration-300">
                <div className="w-full h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  Related Post {item}
                </h3>
                <p className="text-secondary-600 text-sm mb-3">
                  Brief description of a related blog post...
                </p>
                <Link
                  to="/blog"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Stay Updated</h3>
          </div>
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

export default BlogPost; 