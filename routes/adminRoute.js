const express = require('express');
const Router = express.Router();

const adminC = require('../controllers/adminController');


Router.get("/add-category" , adminC.categoryPage);
Router.get("/add-product" , adminC.productPage);
Router.post("/category-action" , adminC.categoryAction);
Router.post("/product-action" , adminC.productAction);


module.exports = Router;
