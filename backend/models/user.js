const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{},
    email:{},
    password:{},
    age:{} //We need age because our users need to be over 13 years old.
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User