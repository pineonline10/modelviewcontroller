const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
      // Check if a user with the same username already exists
      const existingUser = await User.findOne({ where: { username: req.body.username } });
      if (existingUser) {
        res.status(400).json({ message: 'Username is already taken. Please choose another one.' });
        return;
      }
  
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
 // Create a new user
 const userData = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });

  // Save user session
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.status(200).json(userData);
  });
} catch (err) {
  res.status(500).json(err); // Use 500 for server errors
}
});
// Route to log in an existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to log out the user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
