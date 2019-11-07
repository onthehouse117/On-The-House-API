const mongoose = require('mongoose');

/** Comment Schema */
/**Each comment has an author, post ID, content */
const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      post : {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Post'
      },
      content:{
          type: String,
          required: true,
          trim: true,
          validate(value){
            if(value.length === 0){
                throw new Error('Comment must contain text!')
            }
          }
      }

}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment