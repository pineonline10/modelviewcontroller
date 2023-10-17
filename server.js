const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection'); // Import your Sequelize connection
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ 
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

// Routes
const routes = require('./routes');
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
