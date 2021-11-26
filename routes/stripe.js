/*
      Title: Payment Router
      Description: End pointes for Payment
      Author: Nasir Ahmed
      Date: 20-November-2021
      Modified: 26-November-2021
 */

/* -------------------- External Imports (start) -------------------- */
require('dotenv').config();

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
/* -------------------- External Imports (end) -------------------- */

router.post('/payment', async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd'
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;

/** Change Log
 * 26-Nov-2021 : import dotenv because of not reaching ,env file
 * */
