const home = (req,res)=>{
    // res.send('home')

    var record = {
        name:'xyz',
        products:[
            {name:"Product 1", price:1000,path:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"},
            {name:"Product 2", price:2000,path:"https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
        ]
    }
    res.render('homePage',record)
}
const register = (req,res)=>{
    // res.send('register')
    res.render('register')
}
const login = (req,res)=>{
    res.render('loginPage')
}
const loginAction = (req,res)=>{
    const fff = req.body
    console.log(fff);
}
module.exports ={
    home,
    login,
    register,
    loginAction
}