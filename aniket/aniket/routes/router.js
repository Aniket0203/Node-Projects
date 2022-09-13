const express = require("express");
const router= express.Router()
const cController = require('../controllers/commonControllers')
router.get('/',cController.home)
router.get('/login',cController.login)
router.get('/register',cController.register)
router.post('/login-action',cController.loginAction)
module.exports =router;