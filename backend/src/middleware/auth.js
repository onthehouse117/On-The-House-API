const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "Lyndea Dew");
    const user = await user.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) {
      throw new Error("User is not registered");
    }
    req.token = token; // {token: token}
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
