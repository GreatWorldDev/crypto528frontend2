// import mongoose, {Schema} from 'mongoose';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    location: {
      type: Object
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

exports.User = User;
