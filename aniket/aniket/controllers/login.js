
const dbConnect=require("../Models/loginModel")


const register =async (req,res)=>{
    try{
        const addUser={
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
    
       
    }
    const dataToSave= await dbConnect.create(addUser);
    res.send(dataToSave)
}
    
    catch(error){
        res.status(400).json({message:error.message})
 
    }
}

const userlogin = (req,res)=>{
    const finduser={
        email:req.body.email,
        password:req.body.password

    }
    const filterData=dbConnect.findOne(finduser,function(err,data){

    })
    console.log(filterData._conditions)
    if(filterData._conditions){
        res.send('login sucess')
    }
}


const getUsers=async (req,res)=>{

    dbConnect.find({},function(err,data){
        console.log(data)

    })

    // res.send('get user')
}

module.exports={
    userlogin,
    register,
    getUsers
}