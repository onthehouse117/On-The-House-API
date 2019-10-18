const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = mongoose.Schema({
    title:{},
    description:{},
    images:{},
    messages:{}

}, {
    timestamps : true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post

