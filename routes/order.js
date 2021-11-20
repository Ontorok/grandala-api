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
const Order = require('../models/Order');
/* -------------------- Internal Imports (end) -------------------- */

// Create Order
router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res
      .status(200)
      .json(serverResponse('Order placed successfully', savedOrder));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Update Order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res
      .status(200)
      .json(serverResponse('Order Updated Successfully', updatedOrder));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Delete Cart
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(serverResponse('Order has been deleted', null));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get User Order
/**
 * Returns user cart.
 * @param {userId} is the user id whose cart to be rendered.
 */
router.get('/find/:userId', verifyTokenAndAdmin, async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.userId });
    res.status(200).json(serverResponse('User Orders fetched', userOrders));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get All
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(serverResponse('Order fetched', orders));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get monthly income
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount'
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' }
        }
      }
    ]);
    res.status(200).json(serverResponse('Income STAT', income));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

module.exports = router;
