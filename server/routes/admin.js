const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');

// @route   GET api/admin/stats
// @desc    Get admin dashboard stats
// @access  Private (Admin only)
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const totalProjects = await Project.countDocuments();
    const totalBlogPosts = await Blog.countDocuments();
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ read: false });
    const publishedPosts = await Blog.countDocuments({ published: true });

    res.json({
      totalProjects,
      totalBlogPosts,
      totalMessages,
      unreadMessages,
      publishedPosts
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/recent-activity
// @desc    Get recent activity
// @access  Private (Admin only)
router.get('/recent-activity', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const recentProjects = await Project.find()
      .sort({ date: -1 })
      .limit(5)
      .select('title date');

    const recentBlogs = await Blog.find()
      .sort({ date: -1 })
      .limit(5)
      .select('title date');

    const recentMessages = await Contact.find()
      .sort({ date: -1 })
      .limit(5)
      .select('name subject date read');

    res.json({
      recentProjects,
      recentBlogs,
      recentMessages
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/admin/messages/:id/read
// @desc    Mark message as read
// @access  Private (Admin only)
router.put('/messages/:id/read', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    message.read = true;
    await message.save();

    res.json({ msg: 'Message marked as read' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;