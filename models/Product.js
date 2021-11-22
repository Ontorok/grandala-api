/*
     Title: Product Model
     Description: Product Model
     Author: Nasir Ahmed
     Date: 14-November-2021
     Modified: 14-November-2021
*/

/* -------------------- External Imports (start) -------------------- */
const mongoose = require('mongoose');
/* -------------------- External Imports (end) ---------------------- */

// Create Product Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
