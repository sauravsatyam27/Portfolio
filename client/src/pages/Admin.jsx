import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaProjectDiagram, FaBlog, FaEnvelope, FaEye, FaTrash, FaEdit } from 'react-icons/fa';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/recent-activity')
      ]);
      setStats(statsRes.data);
      setRecentActivity(activityRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaProjectDiagram className="text-blue-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-blue-600">{stats?.totalProjects || 0}</span>
            </div>
            <h3 className="text-gray-600">Total Projects</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FaBlog className="text-green-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-green-600">{stats?.publishedPosts || 0}</span>
            </div>
            <h3 className="text-gray-600">Published Posts</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaEnvelope className="text-purple-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-purple-600">{stats?.totalMessages || 0}</span>
            </div>
            <h3 className="text-gray-600">Total Messages</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaEye className="text-yellow-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-yellow-600">{stats?.unreadMessages || 0}</span>
            </div>
            <h3 className="text-gray-600">Unread Messages</h3>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {recentActivity?.recentProjects?.map(project => (
                <div key={project._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(project.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
            <div className="space-y-4">
              {recentActivity?.recentMessages?.map(message => (
                <div key={message._id} className={`p-4 bg-gray-50 rounded-lg ${!message.read ? 'border-l-4 border-primary-600' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{message.name}</h3>
                    <span className="text-sm text-gray-500">{new Date(message.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{message.subject}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
{/* 
          <Link
            to="/admin/blog-editor"
            className="btn-primary"
            >
            Create Blog
          </Link> */}

        </div>
      </div>
    </div>
  );
};

export default Admin;