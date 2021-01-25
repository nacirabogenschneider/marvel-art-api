const User = require("../models/appAdmin.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    const newUser = new User({
      username: req.body.username,
      password: hashedPass,
    });
    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

const login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({
    $and: [{ username: username }],
  }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          const token = jwt.sign(
            { username },
            "2f8[{a]-d!("
            // , {
            //   expiresIn: "4h",
            // }
          );
          res.json({
            message: "login successful!",
            token,
          });
        } else {
          res.json({
            message: "Password does not matched!",
          });
        }
      });
    } else {
      req.json({
        message: "No user found",
      });
    }
  });
};

module.exports = { register, login };