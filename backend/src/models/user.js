const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName:{
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
    } //We need age because our users need to be over 13 years old.
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
