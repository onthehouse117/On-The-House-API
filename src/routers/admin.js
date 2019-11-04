const express = require("express");
const {auth, admin} = require("../middleware/auth");
const router = new express.Router();
const User = require("../models/user");
const multer = require("multer");
const Post = require('../models/post');

/** Admin registration endpoint
 *  @desc Endpoint to register an admin to our database. Along with email and password, the user must provide a secret code.
 */
router.post('/admin/create', async (req, res) =>{
    try{
        if(req.body.secret === process.env.JWT_SECRET){
            delete req.body.secret
            const adminUser = new User(req.body)
            adminUser.admin = true
            adminUser.verified = true
            const token = await adminUser.generateAuthToken()
            res.status(201).send({adminUser, token})

        } else{
            throw new Error({'error':'Secret not provided'})
        }
    } catch(e){
        res.status(400).send(e);
    }
})

/** Delete user endpoint for admin
 *  @desc The admin can delete any user with the email address or _id of the user.
 */
router.post('/admin/deleteUser', auth, admin, async (req, res) =>{
    try{
        var options = {}
        if(req.body._id){
            options._id = req.body._id
        }
        if(req.body.email){
            options.email = req.body.email
        }

        if(!options){
            throw new Error({'error':'Provide one of the following in order to complete this action: user ID, user email'})
        }
        const user = await User.findOne(options)
        if(!user){
            throw new Error({'error': 'The user could not be found'})
        } 
        await user.remove()
        res.status(200).send(user)
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/admin/deletePost', auth, admin, async (req, res) => {
    try {
        var options = {} // id, title, author
        if (req.body._id) {
            options._id = req.body._id
        }
        if (req.body.title) {
            options.title = req.body.title
        }
        if (req.body.author) {
            options.author = req.body.author
            const user = await User.findOne({_id: options.author})
            if (!user) {
                throw new Error('User does not exist')
            }
        }
        if (!options) {
            throw new Error('Must provide one of following options: postId, postTitle, or author')
        }
        const post = await Post.findOne(options)
        await post.remove()
        res.status(200).send(post)
    }
    catch (e){
        res.status(400).send(e)
    }
})

module.exports = router