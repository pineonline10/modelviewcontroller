const router = require('express').Router();
const { Comment } = require('../../models');

// Route to create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get all comments for a specific blog post
router.get('/:blogPostId', async (req, res) => {
  try {
    const allComments = await Comment.findAll({
      where: { blogPostId: req.params.blogPostId },
    });
    res.status(200).json(allComments);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
