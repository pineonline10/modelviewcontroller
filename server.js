const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection'); // Import your Sequelize connection
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ 
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));
app.use('/api', routes);
app.use(express.static('public'));




// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
