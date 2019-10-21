/* Authentication middleware for the user */

const jwt = require("jsonwebtoken");
const User = require("../models/user");
/** Authentication verification function
 *  @desc Verifies that the req header contains a valid jwt
 *  @param req Must contain a header 'Authorization' with a Bearer token. Param will contain the user if verified.
 */
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "Lyndea Dew");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    console.log(user)
    if (!user) {
      throw new Error("User is not registered");
    }
    req.token = token; // {token: token}
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send('error');
  }
};


module.exports = auth;