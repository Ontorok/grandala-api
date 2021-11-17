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
router.post('/', verifyTokenAndAdmin, async (req, res) => {
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

// Update User
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res
      .status(200)
      .json(serverResponse('Product Updated Successfully', updatedProduct));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Delete Product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(serverResponse('Product has been deleted', null));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get Product
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(serverResponse('Product Fetched', product));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

// Get Products
router.get('/', async (req, res) => {
  const { latest, category } = req.query;
  try {
    let products;
    if (latest) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (category) {
      products = await Product.find({
        categories: {
          $in: [category]
        }
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(serverResponse('Users fetched', products));
  } catch (err) {
    res.status(500).json(serverResponse(err.message, null));
  }
});

module.exports = router;
