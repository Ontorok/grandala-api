/*
     Title: Order Router
     Description: End pointes for Order Router
     Author: Nasir Ahmed
     Date: 15-November-2021
     Modified: 15-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

router.get('/', (req, res) => {
  res.send('Order routes separated');
});

router.post('/', (req, res) => {
  const requestbody = { ...req.body };
  res.send(requestbody);
});

module.exports = router;
