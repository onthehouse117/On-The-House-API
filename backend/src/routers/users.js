const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    // console.log(req.body);
    const newUser = new User(req.body);
    
    // We will save the document in our hashing function after it is implemented. For now, save the doc asynchronously
    try {
        // await newUser.save()
        const token = await newUser.generateAuthToken();
        res.status(201).send(newUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
    
})

module.exports = router;
