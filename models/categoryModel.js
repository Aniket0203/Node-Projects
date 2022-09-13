const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
  name:String
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports  = categoryModel;