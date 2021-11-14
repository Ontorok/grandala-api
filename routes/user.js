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

router.get('/', (req, res) => {
  res.send('User routes separated');
});

router.post('/', (req, res) => {
  const requestbody = { ...req.body };
  res.send(requestbody);
});

module.exports = router;
