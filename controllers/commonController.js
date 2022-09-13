const async = require('async'); 
const catM = require('../models/categoryModel');
const brM = require('../models/brandModel');
const productM = require('../models/productModel');
const userM = require('../models/userModel');
var validator = require('validator');
var passM = require('../middlewares/password_m');

const maxValue = 24*60*60*1000;

const main = require('../middlewares/mail');
const payu = require('../middlewares/payu');
const home = (req,res)=>{

    // res.send('index')
    // res.render('index');

    async.parallel({
        categoryData: function(callback) {
            catM.find({},function(err,data){
                if(err){
                    callback(err,null)
                }
                else{
                    callback(null,data)
                }
            })
        },
        brandData: function(callback) {
            brM.find({},function(err,data){
                if(err){
                    callback(err,null)
                }
                else{
                    callback(null,data)
                }
            })
        },
        productData: function(callback) {
            productM.find({},function(err,data){
                if(err){
                    callback(err,null)
                }
                else{
                    callback(null,data)
                }
            })
        }

    }, function(err, results) {
        // results now equals to: results.one: 'abc\n', results.two: 'xyz\n'
        if(err){
            console.log(err)
        }
        else{
            // console.log(results)
            res.render('index' , results )
        }
    });
}


const login = (req,res)=>{
    res.render('loginPage');
}

const loginAction = async(req,res)=>{
    // console.log(req.body);
    // res.send({msg:"Action Route Called"});

    if(validator.isEmpty(req.body.useremail) || !validator.isEmail(req.body.useremail)){
        res.send({msg:"Email is Invalid"});
    }
    else if(validator.isEmpty(req.body.userpassword) || !validator.isAlphanumeric(req.body.userpassword,'en-IN') || !validator.isLength(req.body.userpassword,{min:4, max: 8}) ){
        res.send({msg:"Password is Invalid"});
    }
    else{
        try{
            var ans_email = await userM.findOne({ useremail: req.body.useremail }).exec();
            console.log(ans_email);
            console.log(ans_email.userpassword);
            if(ans_email===null){
                res.send({msg:"Email id does not exist"})
            }
            else{
                ans_password = passM.checkPass(req.body.userpassword , ans_email.userpassword )
                console.log(ans_password);
                if(ans_password){
                    res.send({msg:true})
                }
                else{
                    res.send({msg:"Password Mismatch"})
                }
            }   
        }
        catch(err){
            throw err;
        }
        
        // res.send({msg:"DO AUTH"});
    }
}
const registerAction = async (req,res)=>{
    // console.log(req.body);

    if(validator.isEmpty(req.body.username) || !validator.isLength(req.body.username,{min:2, max: 20})){
        res.send({msg:"User Name is Invalid"});
    }
    else if(validator.isEmpty(req.body.usermobile) || !validator.isMobilePhone(req.body.usermobile,'en-IN')){
        res.send({msg:"Mobile Number is Invalid"});
    }
    else if(validator.isEmpty(req.body.useremail) || !validator.isEmail(req.body.useremail)){
        res.send({msg:"Email is Invalid"});
    }
    else if(validator.isEmpty(req.body.userpassword) || !validator.isAlphanumeric(req.body.userpassword,'en-IN') || !validator.isLength(req.body.userpassword,{min:4, max: 8}) ){
        res.send({msg:"Password is Invalid"});
    }
    else if(req.body.userpassword!=req.body.usercpassword){
        res.send({msg:"Confirm Password Mismatch"});
    }
    else{
        var ans_pass = passM.setPass(req.body.userpassword);
        // console.log(ans_pass);
        req.body.userpassword=ans_pass;
        delete req.body.usercpassword;
        
        try{
            
            var ans_email = await userM.findOne({ useremail: req.body.useremail }).exec();
            // console.log(ans_email , typeof ans_email);
            // return;
            if(ans_email===null){
                const instance = new userM(req.body);
                const ans = await instance.save();
                // console.log("After",ans);
                if(ans){
                    res.send({msg:true})

                    //SEND EMAIL
                    var subject = "Welcome Message From E-Shopper";
                    var msg = `<h1> Dear ${req.body.username}</h1>
                        <p>
                            Thank You For Reistration With E-Shopper
                        </p>
                    `
                    main(req.body.useremail,subject,msg).catch(console.error);
                }
            }
            else{
                res.send({msg:"Email Id Exist"})
            }
        }
        catch(err){ 
            throw err;
        }
        // res.send({msg:"DO Insert"});
    }
    // res.send({msg:"Regisetr Action Route Called"});
}

const cartAction = (req,res)=>{
    // console.log(req.body);
    var record = req.body.pid;
    // STEP1: if cookie is not exist 
    var cookie_data = req.cookies.cookiedata;
    console.log(cookie_data);
    if(cookie_data === undefined){
        // first product store (id)   cookiedata,1, 1 day
        res.cookie('cookiedata', record , { maxAge: maxValue});
        res.send({msg:"Product Added In Cart"});
    }
    else{
        console.log('add 2nd product onward');
        var arr_data = cookie_data.split(",");
        console.log(arr_data);
        //check new products exist or not in cookies using indexOf function
        var ans_exist = arr_data.indexOf(record);
        console.log(ans_exist);
        if(ans_exist ==-1){
            arr_data.push(record);
            var finalVal = arr_data.join(",")
            console.log(finalVal);
            res.cookie('cookiedata', finalVal , { maxAge: maxValue});
            res.send({msg:"Product Updated In Cart"});
        }
        else{
            res.send({msg:"Product Exist In Cart"});
        }
    }
}
const cartPage = (req,res)=>{
    var rec_from_cookie = req.cookies.cookiedata;
    // console.log(rec_from_cookie);
    if(rec_from_cookie===undefined){
        res.render('cartPageView',{status:0,allProducts:[]})
    }
    else{
        var rec_array = rec_from_cookie.split(',');
        productM.find({_id:{$in:rec_array}},function(err,data){
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                res.render('cartPageView',{status:1,allProducts:data});
            }
        })
        
    }
}
const deleteCartAction=(req,res)=>{
    console.log(req.body);
    var rec = req.body.pid;
    var cookie_data = req.cookies.cookiedata;
    console.log(cookie_data);
    var arr_data = cookie_data.split(",");
    console.log(arr_data);
    if(arr_data.length==1){
        res.clearCookie('cookiedata');
    }
    else{
        var position = arr_data.indexOf(rec)
        console.log(position);
        arr_data.splice(position,1)
        console.log(arr_data);
        var finalVal = arr_data.join(",");
        res.cookie('cookiedata', finalVal , { maxAge: maxValue});
    }
    res.send({msg:"Product Deleted From Cart"});

    // res.send({msg :'TEST'})
}

var paymentAction = function(req,res){
    req.body.txnid = Math.round( 1000000*Math.random() );
    req.body.surl = 'http://localhost:4500/success';
    req.body.furl = 'http://localhost:4500/failure';
    payu(req.body , function(err,link){
        res.redirect(link)
    })
}

var successAction = function(req,res){
    console.log(req.body);
}
var failureAction = function(req,res){
    console.log(req.body);
}

module.exports = {
    home,
    login,
    loginAction,
    registerAction,
    cartAction,
    cartPage,
    deleteCartAction,
    paymentAction,
    failureAction,
    successAction
}