/*
     Title: Auth Router
     Description: End pointes for Auth Router
     Author: Nasir Ahmed
     Date: 15-November-2021
     Modified: 15-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const People = require('../models/People');
const { doDecrypt, doEncrypt } = require('../utility/helperMethods');
/* -------------------- Internal Imports (end) -------------------- */

// @TODO: Try to use Bycrypt to entryp password
// User Registration
router.post('/', async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const user = new People({
    username,
    email,
    password: doEncrypt(password),
    isAdmin
  });
  try {
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: 'User Created Successfully!!!', data: savedUser });
  } catch (err) {
    const { message } = err;
    res.status(500).json({
      message,
      data: null
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await People.findOne({ username });

    if (user) {
      const decryptedPassword = doDecrypt(user.password);
      if (decryptedPassword === password) {
        const accessToken = jwt.sign(
          {
            id: user.username,
            isAdmin: user.isAdmin
          },
          process.env.JWT_SECRET,
          { expiresIn: 1800 }
        );
        res.status(200).json({
          message: 'Login Successfull',
          data: accessToken
        });
      } else {
        res.status(401).json({
          message: 'Wrong Credential!!!',
          data: null
        });
      }
    } else {
      res.status(500).json({
        message: 'User not found!!!',
        data: null
      });
    }
  } catch (err) {
    const { message } = err;
    res.status(500).json({
      message,
      data: null
    });
  }
});

module.exports = router;
