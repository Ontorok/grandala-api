/*
     Title: Initial File
     Description: This file will run first when the application is loaded
     Author: Nasir Ahmed
     Date: 14-November-2021
     Modified: 14-November-2021
*/

/* -------------------- External Imports (start) -------------------- */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const { userRouter } = require('./routes');
/* -------------------- Internal Imports (end) -------------------- */

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connection established!!');
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use(express.json());
app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
