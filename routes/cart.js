/*
     Title: Cart Router
     Description: End pointes for Cart Router
     Author: Nasir Ahmed
     Date: 20-November-2021
     Modified: 20-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization
} = require('../middleware/auth');
const { serverResponse } = require('../utility/helperMethods');
const Cart = require('../models/Cart');
/* -------------------- Internal Imports (end) -------------------- */

// Create Cart
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res
      .status(200)
      .json(serverResponse('product added to cart successfully', savedCart));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Update Cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res
      .status(200)
      .json(serverResponse('Cart Updated Successfully', updatedCart));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Delete Cart
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json(serverResponse('Cart has been deleted', null));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get User Cart
/**
 * Returns user cart.
 * @param {userId} is the user id whose cart to be rendered.
 */
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(serverResponse('User Cart Fetched', userCart));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get All
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(serverResponse('Cart fetched', carts));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

module.exports = router;
