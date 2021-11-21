const userRouter = require('./user');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./product');
const authRouter = require('./auth');
const checkoutRouter = require('./stripe');

module.exports = {
  userRouter,
  cartRouter,
  orderRouter,
  productRouter,
  authRouter,
  checkoutRouter
};
