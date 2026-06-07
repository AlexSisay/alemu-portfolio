import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  FileText,
  Plus,
  Pencil,
  Trash2,
  LogIn,
  LogOut,
  X,
  Globe,
  BookOpen,
  User
} from 'lucide-react';
import { BACKEND_URL } from '../config';
import { usePageMeta } from '../hooks/usePageMeta';
import DashboardProfileTab from '../components/dashboard/DashboardProfileTab';
const TOKEN_KEY = 'dashboard_token';

const Dashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: ''
  });
  const [saving, setSaving] = useState(false);
  const [publications, setPublications] = useState([]);
  const [pubLoading, setPubLoading] = useState(true);
  const [showPubForm, setShowPubForm] = useState(false);
  const [editingPub, setEditingPub] = useState(null);
  const [pubFormData, setPubFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    status: 'Published',
    highlights: '',
    abstract: '',
    link: ''
  });
  const [pubSaving, setPubSaving] = useState(false);
  const [pubError, setPubError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  usePageMeta({ title: 'Admin Dashboard', noindex: true });

  const BACKEND_UNREACHABLE_MSG = 'Could not reach backend. If using Render free tier, wait 30–60 seconds and refresh.';
  const wakeBackendUrl = `${BACKEND_URL}/api/health`;
  const gaMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const gaDashboardUrl = 'https://analytics.google.com/';

  const fetchPublications = async () => {
    setPubLoading(true);
    setPubError('');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      const res = await fetch(`${BACKEND_URL}/api/publications`, { signal: controller.signal });
      clearTimeout(timeout);
      const data = await res.json();
      setPublications(Array.isArray(data) ? data : []);
    } catch {
      setPublications([]);
      setPubError(BACKEND_UNREACHABLE_MSG);
    } finally {
      setPubLoading(false);
    }
  };

  const fetchPosts = async () => {
    setFetchError('');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      const res = await fetch(`${BACKEND_URL}/api/blog`, { signal: controller.signal });
      clearTimeout(timeout);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setPosts([]);
      setFetchError('Could not reach backend. If using Render free tier, wait 30–60 seconds and refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (token) {
      fetchPublications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
        signal: controller.signal
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setLoginForm({ username: '', password: '' });
    } catch (err) {
      const msg = err.message || '';
      if (err.name === 'AbortError' || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setLoginError('Backend unreachable. If using Render free tier: open the backend health URL in a new tab, wait 50–60 seconds for it to wake, then try again.');
      } else {
        setLoginError(msg || 'Invalid credentials');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setEditingPost(null);
    setShowForm(false);
    setEditingPub(null);
    setShowPubForm(false);
  };

  const authFetch = (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  };

  const openNewForm = () => {
    setFormData({ title: '', excerpt: '', content: '', tags: '' });
    setEditingPost(null);
    setShowForm(true);
  };

  const openEditForm = (post) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: (post.tags || []).join(', ')
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    setFetchError('');
    try {
      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      };
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      const opts = { method: editingPost ? 'PUT' : 'POST', body: JSON.stringify(payload), signal: controller.signal };
      if (editingPost) {
        await authFetch(`${BACKEND_URL}/api/blog/${editingPost.id}`, { ...opts, method: 'PUT' });
      } else {
        await authFetch(`${BACKEND_URL}/api/blog`, { ...opts, method: 'POST' });
      }
      clearTimeout(timeout);
      fetchPosts();
      closeForm();
    } catch (err) {
      if (err.message?.includes('401') || err.message?.includes('Invalid token')) {
        handleLogout();
      } else if (err.name === 'AbortError' || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setFetchError(BACKEND_UNREACHABLE_MSG);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await authFetch(`${BACKEND_URL}/api/blog/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      if (err.message?.includes('401')) handleLogout();
    }
  };

  const openNewPubForm = () => {
    setPubFormData({
      title: '',
      authors: '',
      journal: '',
      year: new Date().getFullYear(),
      status: 'Published',
      highlights: '',
      abstract: '',
      link: ''
    });
    setEditingPub(null);
    setShowPubForm(true);
  };

  const openEditPubForm = (pub) => {
    setPubFormData({
      title: pub.title || '',
      authors: pub.authors || '',
      journal: pub.journal || '',
      year: pub.year || new Date().getFullYear(),
      status: pub.status || 'Published',
      highlights: Array.isArray(pub.highlights) ? pub.highlights.join('\n') : '',
      abstract: pub.abstract || '',
      link: pub.link || ''
    });
    setEditingPub(pub);
    setShowPubForm(true);
  };

  const closePubForm = () => {
    setShowPubForm(false);
    setEditingPub(null);
  };

  const handlePubSubmit = async (e) => {
    e?.preventDefault?.();
    setPubSaving(true);
    setPubError('');
    try {
      const highlights = (pubFormData.highlights || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const payload = {
        title: pubFormData.title,
        authors: pubFormData.authors,
        journal: pubFormData.journal,
        year: Number(pubFormData.year) || new Date().getFullYear(),
        status: pubFormData.status || 'Published',
        highlights,
        abstract: pubFormData.abstract,
        link: pubFormData.link || ''
      };
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      if (editingPub) {
        await authFetch(`${BACKEND_URL}/api/publications/${editingPub.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      } else {
        await authFetch(`${BACKEND_URL}/api/publications`, {
          method: 'POST',
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      }
      clearTimeout(timeout);
      fetchPublications();
      closePubForm();
    } catch (err) {
      if (err.message?.includes('401') || err.message?.includes('Invalid token')) {
        handleLogout();
      } else if (err.name === 'AbortError' || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setPubError(BACKEND_UNREACHABLE_MSG);
      }
    } finally {
      setPubSaving(false);
    }
  };

  const handlePubDelete = async (id) => {
    if (!window.confirm('Delete this publication?')) return;
    try {
      await authFetch(`${BACKEND_URL}/api/publications/${id}`, { method: 'DELETE' });
      fetchPublications();
    } catch (err) {
      if (err.message?.includes('401')) handleLogout();
    }
  };

  // Not logged in: show login form
  if (!token) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="card">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
            </div>
            <p className="text-secondary-600 text-center mb-6">
              Sign in to post news and updates to your blog.
            </p>
            {loginError && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm((p) => ({ ...p, username: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </form>
          </div>
          <p className="text-center text-sm text-secondary-500 mt-4">
            Run <code className="bg-secondary-100 px-1 rounded">node createAdmin.js</code> to create an admin user.
          </p>
        </motion.div>
      </div>
    );
  }

  // Logged in: blog management dashboard
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Site CMS</h1>
              <p className="text-secondary-600 text-sm">Manage profile, blog, and publications</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 transition-colors"
            >
              View Blog
            </Link>
            <button
              onClick={openNewForm}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-secondary-600 hover:text-red-600 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'analytics', label: 'Analytics', icon: Globe },
            { id: 'publications', label: 'Publications', icon: BookOpen },
            { id: 'blog', label: 'Blog', icon: FileText }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === id
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-secondary-700 border-secondary-300 hover:bg-secondary-50'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && <DashboardProfileTab token={token} authFetch={authFetch} />}

        {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card mb-6"
        >
          <h2 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-primary-600" />
            <span>Visit Stats (Google Analytics)</span>
          </h2>
          <div className="rounded-lg border border-secondary-200 bg-secondary-50 p-4">
            <p className="text-secondary-700">
              Website analytics now run on Google Analytics (free tier) instead of the internal visit tracker.
            </p>
            <p className="text-secondary-600 mt-2 text-sm">
              {gaMeasurementId
                ? `GA4 is configured with measurement ID ${gaMeasurementId}. Open Google Analytics to see visits, pages, and acquisition reports.`
                : 'Set REACT_APP_GA_MEASUREMENT_ID in your frontend environment to connect analytics.'}
            </p>
            <a
              href={gaDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Open Google Analytics
            </a>
          </div>
        </motion.div>
        )}

        {activeTab === 'publications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="card mb-6"
        >
          <h2 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <span>Publications ({publications.length})</span>
            </span>
            <div className="flex items-center gap-2">
              <Link
                to="/publications"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View Page
              </Link>
              {pubError && (
                <a
                  href={BACKEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-600 hover:text-amber-700"
                >
                  Wake up backend
                </a>
              )}
              <button
                onClick={openNewPubForm}
                className="btn-primary inline-flex items-center space-x-1 text-sm py-1.5 px-3"
              >
                <Plus className="w-4 h-4" />
                <span>New Publication</span>
              </button>
            </div>
          </h2>
          {pubError && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex flex-wrap items-center justify-between gap-2">
              <span>{pubError}</span>
              <div className="flex items-center gap-2">
                <a
                  href={wakeBackendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 font-medium hover:underline"
                >
                  Wake up backend
                </a>
                <button onClick={fetchPublications} className="text-amber-700 font-medium hover:underline">
                  Retry
                </button>
              </div>
            </div>
          )}
          {pubLoading ? (
            <div className="py-8 text-center text-secondary-500">Loading...</div>
          ) : publications.length === 0 ? (
            <div className="py-8 text-center text-secondary-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
              <p>No publications yet. Click &quot;New Publication&quot; to add one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {publications
                .sort((a, b) => (b.year || 0) - (a.year || 0))
                .map((pub) => (
                  <div
                    key={pub.id}
                    className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-secondary-800 truncate">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-secondary-500">
                        {pub.journal} • {pub.year}
                        {pub.status === 'Under Review' && ' • Under Review'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => openEditPubForm(pub)}
                        className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePubDelete(pub.id)}
                        className="p-2 text-secondary-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </motion.div>
        )}

        {activeTab === 'blog' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary-600" />
            <span>Your Posts ({posts.length})</span>
          </h2>

          {fetchError && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex justify-between items-center">
              <span>{fetchError}</span>
              <button onClick={fetchPosts} className="text-amber-700 font-medium hover:underline">Retry</button>
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-secondary-500">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center text-secondary-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
              <p>No posts yet. Click &quot;New Post&quot; to create one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-secondary-800 truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-secondary-500">
                      {new Date(post.date || post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => openEditForm(post)}
                      className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-secondary-600 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        )}

        {/* Create/Edit modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-secondary-200">
                <h3 className="text-xl font-semibold text-secondary-800">
                  {editingPost ? 'Edit Post' : 'New Post'}
                </h3>
                <button
                  onClick={closeForm}
                  className="p-2 text-secondary-500 hover:text-secondary-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form id="post-form" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                <div className="p-6 overflow-y-auto space-y-4 flex-1 min-h-0">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, title: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                      placeholder="Post title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Excerpt (short summary)
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, excerpt: e.target.value }))
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief summary for the blog listing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, content: e.target.value }))
                      }
                      rows={12}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                      required
                      placeholder="Write your post content here..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, tags: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="AI, Research, Healthcare"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 p-6 border-t border-secondary-200 flex-shrink-0">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary px-6 py-2 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingPost ? 'Update' : 'Publish'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Publication Create/Edit modal */}
        {showPubForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-secondary-200">
                <h3 className="text-xl font-semibold text-secondary-800">
                  {editingPub ? 'Edit Publication' : 'New Publication'}
                </h3>
                <button
                  onClick={closePubForm}
                  className="p-2 text-secondary-500 hover:text-secondary-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handlePubSubmit} className="flex flex-col flex-1 overflow-hidden">
                <div className="p-6 overflow-y-auto space-y-4 flex-1 min-h-0">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={pubFormData.title}
                      onChange={(e) => setPubFormData((p) => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                      placeholder="Publication title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Authors *</label>
                    <input
                      type="text"
                      value={pubFormData.authors}
                      onChange={(e) => setPubFormData((p) => ({ ...p, authors: e.target.value }))}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                      placeholder="Author1, Author2, ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Journal / Venue *</label>
                    <input
                      type="text"
                      value={pubFormData.journal}
                      onChange={(e) => setPubFormData((p) => ({ ...p, journal: e.target.value }))}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                      placeholder="e.g. NASSJ, arXiv, Under Review"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Year *</label>
                      <input
                        type="number"
                        min="2000"
                        max="2030"
                        value={pubFormData.year}
                        onChange={(e) => setPubFormData((p) => ({ ...p, year: parseInt(e.target.value, 10) || '' }))}
                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="2025"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
                      <select
                        value={pubFormData.status}
                        onChange={(e) => setPubFormData((p) => ({ ...p, status: e.target.value }))}
                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="Published">Published</option>
                        <option value="Under Review">Under Review</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Highlights (one per line, 3 recommended)</label>
                    <textarea
                      value={pubFormData.highlights}
                      onChange={(e) => setPubFormData((p) => ({ ...p, highlights: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="First highlight&#10;Second highlight&#10;Third highlight"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Abstract</label>
                    <textarea
                      value={pubFormData.abstract}
                      onChange={(e) => setPubFormData((p) => ({ ...p, abstract: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                      placeholder="Full abstract..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Link (optional)</label>
                    <input
                      type="url"
                      value={pubFormData.link}
                      onChange={(e) => setPubFormData((p) => ({ ...p, link: e.target.value }))}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 p-6 border-t border-secondary-200 flex-shrink-0">
                  <button
                    type="button"
                    onClick={closePubForm}
                    className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pubSaving}
                    className="btn-primary px-6 py-2 disabled:opacity-50"
                  >
                    {pubSaving ? 'Saving...' : editingPub ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
