const categoryM = require('../models/categoryModel');
const productM = require('../models/productModel');
const brM = require('../models/brandModel');

const multer  = require('multer');
const async = require('async'); 


const folderPath = './assets/uploads/';
const uniquevalue = Date.now();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uniquevalue + file.originalname;
      cb(null, uniqueSuffix)
    }
});
  
const upload = multer({ storage: storage }).single('imgpath')

const categoryPage = (req,res)=>{
    res.render('admin/categoryPage');
}
const productPage = (req,res)=>{
    // res.render('admin/productPage');
    async.parallel({
        categoryData: function(callback) {
            categoryM.find({},function(err,data){
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
        }

    }, function(err, results) {
        // results now equals to: results.one: 'abc\n', results.two: 'xyz\n'
        if(err){
            console.log(err)
        }
        else{
            // console.log(results)
            res.render('admin/productPage' , results )
        }
    });

}
const categoryAction = async(req,res)=>{
    // console.log(req.body);
    // res.send({msg:'tested'})
    try{
            
        var ans_email = await categoryM.findOne({ name: req.body.name }).exec();
        // console.log(ans_email , typeof ans_email);
        // return;
        if(ans_email===null){
            const instance = new categoryM(req.body);
            const ans = await instance.save();
            // console.log("After",ans);
            if(ans){
                res.send({msg:true})
            }
        }
        else{
            res.send({msg:"cateory Exist"})
        }
    }
    catch(err){ 
        throw err;
    }
}
const productAction = (req,res)=>{
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log(err);
        } else if (err) {
            console.log(err);
            // An unknown error occurred when uploading.
        }
        console.log(req.body);
        console.log(req.file);

        req.body.imgpath = uniquevalue + req.file.originalname;

        try{
            
            
            const instance = new productM(req.body);
            const ans = await instance.save();
            // console.log("After",ans);
            if(ans){
                res.send({msg:true})
            }
           
        }
        catch(err){ 
            throw err;
        }

        // Everything went fine.
    })

}

module.exports = {
    categoryPage,
    productPage,
    categoryAction,
    productAction
}