const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ 
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } // Session timeout in milliseconds
}));

// Routes
const routes = require('./routes'); // Import routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
