const { User, BlogPost, Comment } = require('../models');

// Seed data for Users table
const userData = [
  {
    username: 'JohnDoe',
    password: 'password1', 
  },
  {
    username: 'JaneSmith',
    password: 'password2',
  },
];

// Seed data for BlogPosts table
const blogPostData = [
  {
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    userId: 1,
  },
  {
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post.',
    userId: 2,
  },
];

// Seed data for Comments table
const commentData = [
  {
    content: 'Great post!',
    userId: 1,
    blogPostId: 1, 
  },
  {
    content: 'I found this really helpful.',
    userId: 2,
    blogPostId: 1,
  },
];

// Function to seed data
const seedData = async () => {
  // Create users, blog posts, and comments
  await User.bulkCreate(userData, { individualHooks: true });
  await BlogPost.bulkCreate(blogPostData);
  await Comment.bulkCreate(commentData);
};

module.exports = seedData;
