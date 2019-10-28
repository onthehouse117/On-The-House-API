const mongoose = require('mongoose')
const validator = require('validator')

/*The Post Schema */
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },    
    price: {
      type: mongoose.Decimal128,
      required: false,
      trim: true,
      validate(value) {
        if(value <= 0 && value > 10000) {
          throw new Error("Price out of range.");
        }
      }
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
    community: {
      type: String,
      required: true,
      validate(value) {
        var communities = [
          "Plaza Verde",
          "Camino Del Sol",
          "Vista Del Campo Norte",
          "Vista Del Campo",
          "Puerta del Sol",
          "Arroyo Vista",
          "Campus Village",
          "Palo Verde",
          "Verano Place",
          "Ambrose",
          "Berkeley Court",
          "Columbia Court",
          "Dartmouth Court",
          "Harvard Court",
          "Cornell Court",
          "Stanford Court"
        ]
        if (communities.includes(value) == false) {
          throw new Error("Please select the listed communities.");
        }
      }
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
          required: false
        }
      }
    ]
  }, 
  {
    timestamps : true
  }
);



const Post = mongoose.model('Post', postSchema)

module.exports = Post
