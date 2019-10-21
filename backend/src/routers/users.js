const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// User Registration
router.post('/users', async (req, res) => {
    // console.log(req.body);
    const newUser = new User(req.body);
    
    // We will save the document in our hashing function after it is implemented. For now, save the doc asynchronously
    try {
        // await newUser.save()
        const token = await newUser.generateAuthToken();
        res.status(201).send({newUser, token});
    }
    catch (e) {
        res.status(400).send(e);
    }
})




// User login 
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.verifyByCredentials(req.body.email, req.body.password);
        const token = user.generateAuthToken();
        res.status(200).send({user, token});
    }
    catch(e) {
        res.status(400).send(e);
    }

})

module.exports = router;
