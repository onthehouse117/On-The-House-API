const mongoose = require('mongoose')
const Comment = require('./comment')
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
      required: true,
      trim: true,
      validate(value) {
        if(value <= 100 || value > 10000) {
          throw new Error("Price out of range.");
        }
      }
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    images: [
      {
        image: {
        type: String,
        required: false
        }
      }
    ],
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
    name: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: false
    },
    endDate: {
      type: Date,
      required: false
    }
  }, 
  {
    timestamps : true
  }
);

postSchema.virtual("comments", {
  ref: 'Comment',
  localField: "_id",
  foreignField: "post"
})

postSchema.pre("remove", async function (next){
  const post = this
  await Comment.deleteMany({"post" : post._id})

  next()
})



const Post = mongoose.model('Post', postSchema)

module.exports = Post
