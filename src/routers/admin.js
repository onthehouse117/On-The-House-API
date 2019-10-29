const express = require("express");
const {auth, verified, admin} = require("../middleware/auth");
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
            res.status(201).send({adminUser, token})

        } else{
            throw new Error({'error':'Secret not provided'})
        }

    } catch(e){
        res.status(400).send(e);
    }

})