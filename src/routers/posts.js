const express = require("express");
const { auth, verified } = require("../middleware/auth");
const router = new express.Router();
const Post = require("../models/post");
const multer = require("multer");
const {buildFieldOptions, buildFilterOptions} = require('../helpers/queries')

/**  Post Creation Endpoint
 *   @desc Creates a new Post model object associated with User object.
 *   @returns The new post object.
 */
router.post("/posts", auth, verified, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).send({ newPost });
  } catch (e) {
    res.status(500).send(e);
  }
});

/**  Get Post By ID Endpoint
 *   @desc Gets a Post model object by its associated ID.
 *   @returns The requested post object.
 */

router.get("/posts/:id", auth, verified, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send({ error: "Post Not Found" });
    } else {
      res.status(200).send({ post });
    }
  } catch (e) {
    res.status(500);
  }
});

/** Get Posts by Options */

router.post("/posts/getPosts", auth, verified, async (req, res) =>{
  try{
    
    var fieldOptions = buildFieldOptions(req.body)

    var filterOptions = buildFilterOptions(req.body)

    const tasks = await Post.find(fieldOptions, null, filterOptions)

    if(!tasks){
      throw new Error("No results were found")
    }
    res.status(200).send(tasks)

  } catch(e){
    res.status(404).send(e)
  }
})

/**  Delete Post By ID Endpoint
 *   @desc Deletes a Post model object by its associated ID.
 */

router.delete("/posts/:id", auth, verified, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send({ error: "Post Not Found" });
    } else {
      res.status(200).send({ post });
    }
  } catch (e) {
    res.status(500);
  }
});


module.exports = router;