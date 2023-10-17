const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', 
  username: 'root', 
  password: '', 
  database: 'tech_blog_db',
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
