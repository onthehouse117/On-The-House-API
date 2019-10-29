const express = require("express");
const {auth, admin} = require("../middleware/auth");
const router = new express.Router();
const User = require("../models/user");
const multer = require("multer");

/** Admin registration endpoint
 *  @desc Endpoint to register an admin to our database. Along with email and password, the user must provide a secret code.
 */
router.post('/admin/create', async (req, res) =>{
    try{
        if(req.body.secret === process.env.JWT_SECRET){
            delete req.body.secret
            const adminUser = new User(req.body)
            const token = adminUser.generateAuthToken()
            adminUser.admin = true
            adminUser.verified = true
            await adminUser.save()
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
        options._id = req.body._id
        options.email = req.body._id

        if(!options._id && !options.email){
            throw new Error({'error':'Provide one of the following in order to complete this action: user ID, user email'})
        }
        const deletedUser = await User.findOneAndRemove(options)

        if(!deletedUser){
            throw new Error({'error': 'The user could not be found'})
        } 

        res.status(200).send(deletedUser)
    } catch(e){
        res.status(400).send(e)
    }
})