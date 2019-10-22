const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const User = require("../models/user");
const multer = require("multer");
const {sendFirstEmail} = require('../emails/account');



/**  User Registration Endpoint
 *   @desc Creates a new User model object. Creates a new authentication token for the user.
 *   @returns The new user object and authentication token
*/
router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    sendFirstEmail(newUser.email, newUser.firstName);
    const token = await newUser.generateAuthToken();
    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/** User Login Endpoint
 *  @desc Logs in a user using email and password. Creates a new authentication token for the user.
 *  @returns The user object and authentication token.
 */
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.verifyByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/** User Logout Endpoint
 *  @desc Logs a user out of a particular session. Deletes the authentication token provided in header.
 *  @param req The req header must contain a valid jwt. Valdated by multer middleware and auth function 'auth'
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

/** User LogoutAll Endpoint
 *  @desc Logs a user out of all existing sessions. Deletes all tokens associated with the user.
 *  @param req The req header must contain a valid jwt. Validated by multer middleware and auth function 'auth'
 */
router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send()
    }
    catch(e) {
        res.status(500).send(e);   
    }
  });
  

  router.patch('/users/me', auth, async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'age'];
      const isValidOperation = updates.every( (update) => {
            return allowedUpdates.includes(update);
      })
      if (!isValidOperation) {
          res.status(400).send({error: 'Invalid update(s)!'});
      }
      try {
          updates.forEach((update) => req.user[update] = req.body[update])
          await req.user.save();
          res.status(200).send(req.user);
      }
      catch(e) {
        res.status(400).send(e);
      }
  })


  router.delete('/users/me', auth, async (req, res) => {
      try {
        await req.user.remove();
        res.status(200).send(req.user);
      }
      catch(e) {
          res.status(500).send(e);
      }
  })
  

module.exports = router;
