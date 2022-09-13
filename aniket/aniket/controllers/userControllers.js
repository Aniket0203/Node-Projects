

// const userModel = require('../Models/userModel');
const userM = require('../Models/userModel');
const multer = require('multer');

var unique= Date.now();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,unique+file.originalname)
    }
})
const upload = multer({ storage:storage}).single("userfile")

const postData = async function (req, res) {
    try {
        const instance = new userM(req.body)
        var ans = await instance.save();
        res.send({ result: ans });
    }
    catch (err) {
        res.send({ result: err })
    }

}
const getData = async function (req, res) {
    try {
        var ans = await userM.find()
        res.send({ result: ans });
    }
    catch (err) {
        res.send({ result: err })
    }
}

const updateData = async function (req, res) {
    var userId = req.params.userId


    {
        try {
            var ans = await userM.findByIdAndUpdate(userId, req.body)
            res.send({ result: ans });
        }
        catch (err) {
            res.send({ result: err })
        }

    }
}
const deleteData =  async function (req, res) {
    var userId = req.params.userId
    try{
        var ans = await userM.findByIdAndDelete(userId)
        res.send({results:ans})

    }
    catch(err){
        res.send({results:err})
        
    }


}

const fileupload=(req,res)=>{
    // res.render('upload_page')
}
const fileuploadAction=(req,res)=>{
    res.send("test")
    upload(req,res,function (err){
        if(err){
            console.log(err);
        }
        else{
            console.log(req.body);
            console.log(req.file);
            res.send("file uploaded")


            
        }
    });
    
}


module.exports = {
    postData,
    getData,
    deleteData,
    updateData,
    fileupload,
    fileuploadAction
}