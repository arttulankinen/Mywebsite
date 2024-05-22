const jwt = require('jsonwebtoken');
const BlacklistToken = require('./blacklistToken'); // Corrected the import path

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const tokenWithoutBearer = token.replace('Bearer ', '');
    
    // Check if the token is blacklisted
    const blacklistedToken = await BlacklistToken.findOne({ token: tokenWithoutBearer });
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    // Verify token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;