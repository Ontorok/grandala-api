/*
     Title: Cart Models
     Description: Cart Model
     Author: Nasir Ahmed
     Date: 14-November-2021
     Modified: 14-November-2021
*/

/* -------------------- External Imports (start) -------------------- */
const mongoose = require('mongoose');
/* -------------------- External Imports (end) ---------------------- */

// Create Cart Schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
