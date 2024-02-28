const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postImage:{
        type:Array,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true 
    },
    username:{
       type:String,
       required:true
    },
    phone:{
       type:String,
       required:true
    },
    profilePhoto:{
       type:String,
    }
    
},{timestamps:true})
const posts = mongoose.model('posts',postSchema)
module.exports = posts