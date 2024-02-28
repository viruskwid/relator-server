const express =require('express')
const router=express.Router()
const userController = require('../Controllers/userController')
const multerConfig = require('../Middlewares/multerMiddleware')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const postController = require('../Controllers/postController')
const adminController = require('../Controllers/adminController')
//register
router.post('/register',userController.register)
//login
router.post('/login' , userController.login)
//add post
router.post('/addpost', jwtMiddleware,multerConfig.array('postImage',4) , postController.addPost)
//get posts
router.get('/getpost',postController.getAllPosts)
//update user profile
router.put('/user/update',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)
//get a post 
router.get('/getAPost/:pId',postController.getAPost)
//get user post
router.get('/getUserPost/:phone',postController.getUserPost)
//reomve projects
router.delete('/post/remove/:pId',postController.removePost)
//gett all counts
router.get(`/getAllCounts`,adminController.getAllCounts)
module.exports=router
