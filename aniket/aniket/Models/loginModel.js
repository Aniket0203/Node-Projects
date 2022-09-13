const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username:String,
    password:String,
    email:String

});

const loginModel= mongoose.model('login',loginSchema);
module.exports=loginModel;