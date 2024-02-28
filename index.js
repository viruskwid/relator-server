require('dotenv').config()
const express = require('express')
const cors =require('cors')
const router = require('./Router/routes')
const rEServer=express()
require('./DB/connection')
rEServer.use(cors())
rEServer.use(express.json())
rEServer.use(router)
rEServer.use('/uploads',express.static('./uploads'))
const PORT = 3000

rEServer.listen(PORT,()=>{
    console.log(`OUR REALESTATE PROJECT STARTED AT ${PORT}`);
})
rEServer.get('/',(req,res)=>{
    res.status(200).send("<h2>PROJECT STARTED !!!!!</h2>")
})