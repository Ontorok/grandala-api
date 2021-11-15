/*
     Title: Auth Router
     Description: End pointes for Auth Router
     Author: Nasir Ahmed
     Date: 15-November-2021
     Modified: 15-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const People = require('../models/People');
/* -------------------- Internal Imports (end) -------------------- */

/**
 * User Registration
 */
router.post('/', async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const user = new People({
    username,
    email,
    password,
    isAdmin
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
