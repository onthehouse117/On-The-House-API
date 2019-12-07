const express = require("express");
const { auth, verified } = require("../middleware/auth");
const router = new express.Router();
const User = require("../models/user");
const multer = require("multer");
const { sendFirstEmail, sendSupportEmail } = require("../emails/account");

/**  User Registration Endpoint
 *   @desc Creates a new User model object. Creates a new authentication token for the user.
 *   @returns The new user object and authentication token
 */
router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();

    //HARDCODED FIX THIS
    const url =
      "https://onthehouse-190cb.firebaseapp.com/" +
      "/verify" +
      "?token=" +
      token;
    sendFirstEmail(newUser.email, newUser.firstName, url);
    res.status(201).send({ user: newUser, token });
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
    if(!user){
      throw new Error({"msg": "The user does not exist"})
    }
    if(!user.verified){
      throw new Error({"msg": "User is not verified."})
    }
    const token = await user.generateAuthToken();
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
    res.status(200).send("Successfully logged out of one token.");
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
    res.status(200).send("Successfully logged out of all tokens.");
  } catch (e) {
    res.status(500).send(e);
  }
});

/** User Verify Endpoint
 *  @desc Logs a user out of all existing sessions. Deletes all tokens associated with the user.
 *  @param req The req header must contain a valid jwt. Validated by multer middleware and auth function 'auth'
 */
router.post("/users/verify", auth, async (req, res) => {
  try {
    req.user.verified = true;
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/** User Contact Support Email Endpoint
 *  @desc Allows the user to contact our website's support.
 */
router.post("/users/contactSupport", auth, verified, async (req, res) => {
  try {
    sendSupportEmail(req.user, req.body.subject, req.body.message);
  } catch (e) {
    res.status(400).send(e);
  }
});
/** Patch User Endpoint
 *  @desc Updates the user in a given list of fields. Validates that the fields provided are mutable.
 *  @param req Contains the fields that need to be modified with their new values
 *  @returns The changed user object is returned
 */

router.patch("/users/me", auth, verified, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName", "email", "password", "DOB"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid update(s)!" });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
/** Delete User endpoint
 *  @desc Deletes the logged in user.
 *  @param req Contains the authentication token in the header. Middleware authenticates the user
 *  @returns The user that was successfully deleted
 */
router.delete("/users/me", auth, verified, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
