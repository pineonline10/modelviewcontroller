const router = require('express').Router();
const { BlogPost } = require('../../models');

// Route to create a new blog post
router.post('/', async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create(req.body);
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get all blog posts
router.get('/', async (req, res) => {
  try {
    const allBlogPosts = await BlogPost.findAll();
    res.status(200).json(allBlogPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
