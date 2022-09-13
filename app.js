const express = require('express');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var bodyParser = require('body-parser')

require('./db/config');

const commonR = require('./routes/commonRoute');
const adminR = require('./routes/adminRoute');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.use('/assets', express.static('assets'));

app.use(function(req,res,next){
    var cookie_data = req.cookies.cookiedata;
    console.log(cookie_data);
    if(cookie_data===undefined){
        app.locals.cartCount=0;
    }
    else{
        var arr_cookie = cookie_data.split(",").length;
        app.locals.cartCount=arr_cookie;
    }
    next();
});


app.use("/",commonR);
app.use("/admin",adminR);



app.listen(process.env.PORT , ()=>{
    console.log('LISTENING');
})