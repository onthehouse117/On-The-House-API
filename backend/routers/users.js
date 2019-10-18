const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    try {
        res.status(201).send(newUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;
