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

/*
 ** Verify access token
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(' ')[1];
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json(serverResponse('Token Not valid', null));
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json(serverResponse('Authentication Failed', null));
  }
};

/*
 ** Verify access token and check parametric id and user id is same or logged in user is an Admin
 */
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json(serverResponse('You are not allowed to to this', null));
    }
  });
};

/*
 ** Verify access token and check logged in user is an Admin
 */
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json(serverResponse('You are not allowed to to this', null));
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
