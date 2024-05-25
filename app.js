require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
const bodyParser = require('body-parser');


const app = express();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/auth', require('./routes/registerRoutes'));
app.use('/api/auth', require('./routes/loginRoutes'))
app.use('/api/email', emailRoutes);
