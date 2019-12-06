const express = require("express");
const { auth, verified } = require("../middleware/auth");
const router = new express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const multer = require("multer");


router.get('/comments/:id', auth, verified, async (req, res) =>{
    try{
        const comments = await Comment.find({post:req.params.id})

        if(!comments){
            throw new Error({"error": "There are no comments for this post"})
        }
        res.status(200).send(comments)

    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/comments/createComment', auth, verified, async (req, res) =>{
    try{
        req.body.author = req.user._id
        req.body.name = req.user.firstName.trim() + " " + req.user.lastName.trim()
        const comment = new Comment(req.body)
        await comment.save()
        res.status(201).send(comment)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/comments/:id', auth, verified, async (req, res) =>{
    try{
        const comment = await Comment.findById(req.params.id)
        if(req.user._id !== comment.author){
            throw new Error({"error":"The user making the request is not the author of the comment"})
        }
        await comment.remove()
        res.status(200).send(comment)
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router
