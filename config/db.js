const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { JsonWebTokenError } = require('jsonwebtoken');



dotenv.config();
console.log('dotenv loaded:', dotenv.config());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  JWT_SECRET: process.env.JWT_SECRET
};