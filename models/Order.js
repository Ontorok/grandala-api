/*
     Title: Order Models
     Description: Order Model
     Author: Nasir Ahmed
     Date: 14-November-2021
     Modified: 14-November-2021
*/

/* -------------------- External Imports (start) -------------------- */
const mongoose = require('mongoose');
/* -------------------- External Imports (end) ---------------------- */

// Create Order Schema
const orderSchema = new mongoose.Schema(
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
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
