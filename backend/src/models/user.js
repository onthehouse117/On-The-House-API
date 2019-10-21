const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* The User Schema */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (value.split("@")[1] !== "uci.edu") {
          throw new Error("Email must be uci email.");
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain keyword: "password"');
        }
        // var exp = RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");
        if (value.length < 8) {
          throw new Error("Password must be atleast 8 characters long");
        }
      }
    },
    age: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number.");
        }
        if (value < 13) {
          throw new Error("Must be atleast 13 years old to register.");
        }
      }
    }, //We need age because our users need to be over 13 years old.
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

/** Mongoose middlware 'pre' -> 'save'
 *  @desc Implementation of mongoose middleware that hashes a password if it is modified before saving.
 *  @param next The point of control after middleware runs.
 */
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

/** Generate authentication token 
 *  @desc Generates authentication token for the user using jwt.
 */
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "Lyndea Dew");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/** Verify user by credentials
 *  @desc Verifies a particular user given an email and password
 *  @param email The email of the user
 *  @param password The password of the user
 *  @returns The user if it was verified
 */
userSchema.statics.verifyByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Username or password is not correct");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Username or password is not correct");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
