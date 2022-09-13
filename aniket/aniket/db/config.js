const mongoose = require('mongoose')

const dbConnect = async ()=>{
    var connectpath = 'mongodb+srv://dhaval:abcde@cluster0.d6b50.mongodb.net/abcd?retryWrites=true&w=majority'
    return await mongoose.connect(connectpath)
}

dbConnect().then((res)=>{
    console.log('res=>>>>', res);
}).catch((err)=>{
    console.log('errr=>>>',err);
})