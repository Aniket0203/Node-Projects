const express = require('express');
const Router = express.Router();

const commonC = require('../controllers/commonController');


Router.get("/" , commonC.home);
Router.get("/login" , commonC.login);
Router.post("/login-action" , commonC.loginAction);
Router.post("/register-action" , commonC.registerAction);
Router.post("/cart-action" , commonC.cartAction);
Router.post("/delete-cart-action" , commonC.deleteCartAction);
Router.get("/cart" , commonC.cartPage);
Router.post("/success" , commonC.successAction);
Router.post("/failure" , commonC.failureAction);
Router.post("/pay-action" , commonC.paymentAction);


module.exports = Router;
