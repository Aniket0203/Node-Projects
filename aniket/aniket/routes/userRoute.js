var express = require('express');
var userC= require('../controllers/userControllers');
// const router = require('./router');
var Router = express.Router();

Router
.get("/",userC.getData)
.post("/",userC.postData)
.delete("/:userId",userC.deleteData)
.put("/:userId",userC.updateData)

.get("/upload",userC.fileupload)
.post("/upload-action",userC.fileuploadAction)

module.exports=Router;
