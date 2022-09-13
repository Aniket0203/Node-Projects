const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
  name:String,
  price:Number,
  discount:Number,
  categoryid:String,
  brandid:String,
  imgpath:String
});

const categoryModel = mongoose.model('products', categorySchema);

module.exports  = categoryModel;