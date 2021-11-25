// /*
//      Title: Payment Router
//      Description: End pointes for Payment
//      Author: Nasir Ahmed
//      Date: 20-November-2021
//      Modified: 20-November-2021
// */

// /* -------------------- External Imports (start) -------------------- */
const KEY =
  'sk_test_51JxyNiGkuPwZHBmsHjlCVCKwSF12K7NzIgkAfEL6z1oJah4TMCnIsKrunXVSdL6XafmwPuewTy2g8jeWzJaFXAvz004iM71qsJ';
const router = require('express').Router();
const stripe = require('stripe')(KEY);
// /* -------------------- External Imports (end) -------------------- */

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
