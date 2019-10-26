const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const Post = require("../models/post");
const multer = require("multer");


/**  Post Creation Endpoint
 *   @desc Creates a new Post model object associated with User object.
 *   @returns The new post object.
*/
router.post("/post", auth, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    res.status(20).send({ newPost });
  } catch (e) {
    res.status(500).send(e);
  }
});

/**  Get Post By ID Endpoint
 *   @desc Gets a Post model object by its associated ID.
 *   @returns The requested post object.
*/  
router.get("/posts/:id", auth, async (req, res) => {
  try {
    Post.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    })
    //Insert 404 error here

    res.status(200).send({ post });
  } catch (e) {
    res.status(500)
  }
});