/*
     Title: Cart Router
     Description: End pointes for Cart Router
     Author: Nasir Ahmed
     Date: 15-November-2021
     Modified: 15-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

// User cart 
router.get('/', (req, res) => {
  res.send('Cart routes separated');
});

router.post('/', (req, res) => {
  const requestbody = { ...req.body };
  res.send(requestbody);
});

module.exports = router;
