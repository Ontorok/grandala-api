/*
    Title: User Models
    Description: User Model
    Author: Nasir Ahmed
    Date: 14-November-2021
    Modified: 14-November-2021
*/

/* -------------------- External Imports (start) -------------------- */
const mongoose = require('mongoose');
/* -------------------- External Imports (end) ---------------------- */

// Create User Schema
const peopleSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const People = mongoose.model('People', peopleSchema);

module.exports = People;
