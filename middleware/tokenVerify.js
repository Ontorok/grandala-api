/*
     Title: Token Verify
     Description: This middleware checks if the token is valid or not
     Author: Nasir Ahmed
     Date: 17-November-2021
     Modified: 17-November-2021
*/

// Imports
const jwt = require('jsonwebtoken');
const { serverResponse } = require('../utility/helperMethods');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(' ')[1];
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json(serverResponse('Token Not valid', null));
      }
      req.user = user;
      return next();
    });
  }
  return res.status(401).json(serverResponse('Authentication Failed', null));
};

module.exports = verifyToken;
