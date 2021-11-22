// /*
//      Title: Payment Router
//      Description: End pointes for Payment
//      Author: Nasir Ahmed
//      Date: 20-November-2021
//      Modified: 20-November-2021
// */

// /* -------------------- External Imports (start) -------------------- */
// const router = require('express').Router();
// const stripe = require('stripe')(process.env.STRIPE_KEY);
// /* -------------------- External Imports (end) -------------------- */

// router.post('/payment', (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: 'usd'
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         console.log(stripeErr);
//         res.status(500).json(stripeErr);
//       } else {
//         console.log('res');
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;

const router = require('express').Router();
// const stripe = require('stripe')(process.env.STRIPE_KEY);
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_KEY);

router.post('/payment', (req, res) => {
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
