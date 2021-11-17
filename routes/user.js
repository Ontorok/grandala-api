/*
     Title: User Router
     Description: End pointes for User Router
     Author: Nasir Ahmed
     Date: 14-November-2021
     Modified: 14-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const {
  varifyTokenAndAuthorization,
  varifyTokenAndAdmin
} = require('../middleware/auth');
const { doEncrypt, serverResponse } = require('../utility/helperMethods');
const People = require('../models/People');
/* -------------------- Internal Imports (end) -------------------- */

// Update User
router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = doEncrypt(req.body.password);
  }
  try {
    const updatedUser = await People.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(serverResponse('User updated', updatedUser));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Delete User
router.delete('/:id', varifyTokenAndAuthorization, async (req, res) => {
  try {
    await People.findByIdAndDelete(req.params.id);
    res.status(200).json(serverResponse('User has been deleted', null));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get User
router.get('/find/:id', varifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await People.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(serverResponse('User fetched', others));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get Users
router.get('/', varifyTokenAndAdmin, async (req, res) => {
  const { latest, max } = req.query;
  try {
    const users = latest
      ? await People.find().sort({ createdAt: -1 }).limit(Number(max))
      : await People.find();
    res.status(200).json(serverResponse('Users fetched', users));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get User Stats
router.get('/stat', varifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  console.log({ date, lastYear });
  try {
    const data = await People.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' }
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(serverResponse('Users STAT', data));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

module.exports = router;
