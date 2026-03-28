import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaCalendar, FaUser, FaTag } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/blog');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, tutorials and insights about web development and technology.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-shadow"
              >
                <Link to={`/blog/${post._id}`} className="block md:flex">
                  {post.image && (
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
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
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}

            {posts.length === 0 && (
              <div className="text-center text-gray-500">
                No blog posts yet. Check back soon!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;