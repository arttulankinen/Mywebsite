require('dotenv').config();
const User = require('../models/UserData');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../middleware/blacklistToken')

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function logout(req, res) {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    await new BlacklistToken({ token }).save();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login, logout };