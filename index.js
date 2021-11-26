/*
     Title: Initial File
     Description: This file will run first when the application is loaded
     Author: Nasir Ahmed
     Date: 14-November-2021 
     Modified: 26-November-2021
*/

/* -------------------- External Imports (start) -------------------- */
require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/* -------------------- External Imports (end) -------------------- */

/* -------------------- Internal Imports (start) -------------------- */
const {
  userRouter,
  productRouter,
  cartRouter,
  orderRouter,
  authRouter,
  checkoutRouter
} = require('./routes');
/* -------------------- Internal Imports (end) -------------------- */

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
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/checkout', checkoutRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});

/** Change Log
 * 25-Nov-2021 : create https server
 * 26-Nov-2021 : back to http server
 * */
