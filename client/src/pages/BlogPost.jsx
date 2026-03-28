import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaCalendar, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      setPost(res.data);
    } catch (err) {
      setError('Blog post not found');
      console.error('Error fetching blog post:', err);
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

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {post.image && (
            <div className="rounded-xl overflow-hidden shadow-xl mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-8 pb-8 border-b">
              <span className="flex items-center">
                <FaCalendar className="mr-2" /> {new Date(post.date).toLocaleDateString()}
              </span>
              {post.author && (
                <span className="flex items-center">
                  <FaUser className="mr-2" /> {post.author.name}
                </span>
              )}
              {post.tags && post.tags.length > 0 && (
                <span className="flex items-center">
                  <FaTag className="mr-2" /> {post.tags.join(', ')}
                </span>
              )}
              <span className="text-gray-400">
                {post.views} {post.views === 1 ? 'view' : 'views'}
              </span>
            </div>

            <div className="prose max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;