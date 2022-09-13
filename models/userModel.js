const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
  username:String,
  usermobile:Number,
  useremail:String,
  userpassword:String
});

const categoryModel = mongoose.model('users', categorySchema);

module.exports  = categoryModel;