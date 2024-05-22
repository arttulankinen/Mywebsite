const mongoose = require('mongoose');

const loginDataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const LoginData = mongoose.model('LoginData', loginDataSchema);

module.exports = LoginData;