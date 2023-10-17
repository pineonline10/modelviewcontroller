const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: 'userId',
    onDelete: 'CASCADE', 
  });
  
  User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE', 
  });
  Comment.belongsTo(User, {
    foreignKey: 'userId',
  });
  
  Comment.belongsTo(BlogPost, {
    foreignKey: 'blogPostId',
  });
  BlogPost.belongsTo(User, {
    foreignKey: 'userId',
  });
  
  BlogPost.hasMany(Comment, {
    foreignKey: 'blogPostId',
    onDelete: 'CASCADE',
  });
  
module.exports = {
    User, BlogPost, Comment
};