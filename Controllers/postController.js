const posts = require('../Models/postModel')
const jwt = require('jsonwebtoken')

//add post 
exports.addPost = async (req,res)=>{
    console.log("inside post control");
    const{
      title,
      location,
      price,
      username,
      phone,
      profilePhoto  
    } = req.body;
    const userId = req.payload;
    const postImage = req.files;
    console.log(req.body);
    console.log(req.files);
    console.log(profilePhoto);
    try{
       const existingPost = await posts.findOne({title})
       if (existingPost) {
        res.status(406).json("This post is already exist")
       }else{
        console.log("Add new Post");
        const newPost = new posts({
            postImage,
            title,
            location,
            price,
            username,
            phone,
            profilePhoto
        })
        await newPost.save()
        console.log(newPost);
        const token =jwt.sign({userId:newPost._id},process.env.jwt_secret)
        res.status(200).json(newPost)
       }
        
    }catch(err){
        res.status(401).json(err)
    }
}

//get all posts

exports.getAllPosts = async (req, res) => {
    try {
        const searchKey = req.query.search;
        console.log(req.query)
        console.log("Search Key:", searchKey); // Log here to check the value
        console.log("Request Query:", req.query); // Log the entire query object

        const query = {
            title: { $regex: searchKey, $options: "i" }
        };

        console.log("Query:", query); // Log the constructed query

        const allPosts = await posts.find(query);
        console.log("Found Posts:", allPosts); // Log the found posts

        res.status(200).json(allPosts);
    } catch (err) {
        console.error("Error in getAllPosts:", err); // Log any errors
        res.status(401).json(err);
    }
};


//get a post

exports.getAPost = async(req,res)=>{
    const {pId} = req.params;
    console.log(pId);
    try{
        const post = await posts.find({_id:pId})
        res.status(200).json(post)
    }catch(err){
        res.status(401).json(err)
    } 
}

//get user post

exports.getUserPost = async(req,res)=>{
    const {phone} = req.params
    console.log(phone);
    try{
           const post = await posts.find({phone:phone})
           res.status(200).json(post)
           console.log(post);
    }catch(err){
        res.status(401).json(err)
    }
}

// delete data
exports.removePost = async (req,res)=>{
    const {pId} = req.params
try{
        const deleteData = await posts.findByIdAndDelete({_id:pId})
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}