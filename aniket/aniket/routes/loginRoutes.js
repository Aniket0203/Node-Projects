const express= require('express')
const router= express.Router()

const loginC=require('../controllers/login')


router
.get('/users',loginC.getUsers)
.post('/resgister',loginC.register)
.post('/login',loginC.userlogin)

module.exports=router;