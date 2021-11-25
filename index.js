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
const cors = require('cors');

const https = require('https');
const path = require('path');
const fs = require('fs');

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
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/checkout', checkoutRouter);

const sslserver = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  },
  app
);

sslserver.listen(process.env.PORT, () =>
  console.log(`Server is running on PORT: ${process.env.PORT}`)
);
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on PORT: ${process.env.PORT}`);
// });
