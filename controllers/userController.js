const User = require('../models/UserData');



// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new user document
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate field value entered' });
    }
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  registerUser
};