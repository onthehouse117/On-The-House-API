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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded._id)
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    console.log(user)
    if (!user) {
      throw new Error({"error": "User is not registered"});
    }
    req.token = token; // {token: token}
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};

const verified = async (req, res, next) =>{
  try{
    if(!req.user){
      throw new Error('User is not registed');
    }
    if(!req.user.verified){
      throw new Error({"error": "Please verify your account"});
    }
    next()
  } catch(e){
    res.status(401).send(e);
  }
  
}

const admin = async (req, res, next) =>{
  try{
    if(!req.user){
      throw new Error({"error":"Admin does not exist"})
    }
    if(!req.user.admin){
      throw new Error({"error": "This user is not an admin"})
    }
    next()
  } catch(e){
    res.status(401).send(e)
  }
  
}

module.exports = {
  auth,
  verified,
  admin
};
