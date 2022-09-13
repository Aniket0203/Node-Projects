const mongoose = require('mongoose');

async function dbConnect(){
    await mongoose.connect('mongodb://localhost:27017/eshop');
}
dbConnect()
.then((res)=>{
    console.log("Connected");
    console.log(res);
})
.catch((err)=>{
    console.log(err);exit;
})