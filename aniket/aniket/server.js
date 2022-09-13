require('dotenv').config();
require('./db/config')
const express = require('express')
var bodyParser = require('body-parser') 


const port = process.env.PORT
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
 
app.use('/',require('./routes/router'))

// const routes= require('./routes/router')
const userR = require('./routes/userRoute');
const routes = require('./routes/router');


app.set('view engine','ejs')
// parse application/x-www-form-urlencoded


app.use("/users",userR)
app.use("/",routes)

app.use('/log',require('./routes/loginRoutes'))


app.listen(port,()=>{
    console.log('server started',`${port}`);
})