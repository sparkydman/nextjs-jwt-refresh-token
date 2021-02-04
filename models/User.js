const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username most be unique'],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email most be unique'],
    trim: true,
    lowercase: true,
  },
  password: { type: String, require: [true, 'Password is required'] },
  refreshToken: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
