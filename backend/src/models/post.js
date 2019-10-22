const mongoose = require('mongoose')
const validator = require('validator')
​
/*The Post Schema */
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    images: {
      type: String,
      required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comments: [
      {
        comment: {
          type: String,
          required: true
        }
      }
    ]
  }, 
  {
    timestamps : true
  }
);
​
​
​
​
​
const Post = mongoose.model('Post', postSchema)
​
module.exports = Post
​