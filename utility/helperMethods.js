/*
     Title: Helper Methods
     Description: This file contains helper methods for application
     Author: Nasir Ahmed
     Date: 16-November-2021
     Modified: 16-November-2021
*/

// Imports
const crypto = require('crypto-js');

const doEncrypt = (stringpass) => {
  const encrypted = crypto.AES.encrypt(
    stringpass,
    process.env.SECRET_PASSPHRASE
  ).toString();
  return encrypted;
};

const doDecrypt = (encryptPass) => {
  const decrypted = crypto.AES.decrypt(
    encryptPass,
    process.env.SECRET_PASSPHRASE
  ).toString(crypto.enc.Utf8);
  return decrypted;
};

const serverResponse = (message, data) => {
  return {
    message,
    data
  };
};

module.exports = {
  doEncrypt,
  doDecrypt,
  serverResponse
};
