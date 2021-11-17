/*
     Title: User Router
     Description: End pointes for User Router
     Author: Nasir Ahmed
     Date: 14-November-2021
     Modified: 14-November-2021 
*/

/* -------------------- External Imports (start) -------------------- */
const router = require('express').Router();
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const tokenVerify = require('../middleware/tokenVerify');
/* -------------------- Internal Imports (end) -------------------- */

router.get('/', tokenVerify, (req, res) => {
  res.send('User route separated');
});

router.post('/', (req, res) => {
  const requestbody = { ...req.body };
  res.send(requestbody);
});

module.exports = router;
