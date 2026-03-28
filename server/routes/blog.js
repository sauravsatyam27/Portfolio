const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// @route   GET api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ published: true })
      .populate('author', 'name')
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/blog/all
// @desc    Get all blog posts (including unpublished) - Admin only
// @access  Private
router.get('/all', auth, async (req, res) => {
  try {
    const posts = await Blog.find()
      .populate('author', 'name')
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/blog/:id
// @desc    Get blog post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate('author', 'name');
    if (!post) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/blog
// @desc    Create a blog post
// @access  Private (Admin only)
router.post('/', [auth, [
  body('title').not().isEmpty(),
  body('content').not().isEmpty(),
  body('excerpt').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, excerpt, image, tags, published } = req.body;

  try {
    const newPost = new Blog({
      title,
      content,
      excerpt,
      image,
      author: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      published: published || false,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/blog/:id
// @desc    Update a blog post
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    let post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    post = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/blog/:id
// @desc    Delete a blog post
// @access  Private (Admin only)
// DELETE api/blog/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Blog post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get("/search/:keyword", async (req, res) => {

  const blogs = await Blog.find({
    title: { $regex: req.params.keyword, $options: "i" }
  });

  res.json(blogs);

});

module.exports = router;