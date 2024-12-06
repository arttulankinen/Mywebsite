const mongoose = require('mongoose');
require('dotenv').config();

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1h', 
  },
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);