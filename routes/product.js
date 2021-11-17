/*
     Title: Product Router
     Description: End pointes for Product Router
     Author: Nasir Ahmed
     Date: 15-November-2021
     Modified: 17-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const { verifyTokenAndAdmin } = require('../middleware/auth');
const { serverResponse } = require('../utility/helperMethods');
const Product = require('../models/Product');
/* -------------------- Internal Imports (end) -------------------- */

// Create Product
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res
      .status(200)
      .json(serverResponse('Product created successfully', savedProduct));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// // Update User
// router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {
//   if (req.body.password) {
//     req.body.password = doEncrypt(req.body.password);
//   }
//   try {
//     const updatedUser = await People.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body
//       },
//       { new: true }
//     );
//     res.status(200).json(serverResponse('User updated', updatedUser));
//   } catch (err) {
//     res.status(500).json(serverResponse(err.message, null));
//   }
// });

// // Delete User
// router.delete('/:id', varifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await People.findByIdAndDelete(req.params.id);
//     res.status(200).json(serverResponse('User has been deleted', null));
//   } catch (err) {
//     res.status(500).json(serverResponse(err.message, null));
//   }
// });

// // Get User
// router.get('/find/:id', varifyTokenAndAdmin, async (req, res) => {
//   try {
//     const user = await People.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(serverResponse('User fetched', others));
//   } catch (err) {
//     res.status(500).json(serverResponse(err.message, null));
//   }
// });

// // Get Users
// router.get('/', varifyTokenAndAdmin, async (req, res) => {
//   const { latest, max } = req.query;
//   try {
//     const users = latest
//       ? await People.find().sort({ createdAt: -1 }).limit(Number(max))
//       : await People.find();
//     res.status(200).json(serverResponse('Users fetched', users));
//   } catch (err) {
//     res.status(500).json(serverResponse(err.message, null));
//   }
// });

// // Get User Stats
// router.get('/stat', varifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//   try {
//     const data = await People.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: '$createdAt' }
//         }
//       },
//       {
//         $group: {
//           _id: '$month',
//           total: { $sum: 1 }
//         }
//       }
//     ]);
//     res.status(200).json(serverResponse('Users STAT', data));
//   } catch (err) {
//     res.status(500).json(serverResponse(err.message, null));
//   }
// });

module.exports = router;
