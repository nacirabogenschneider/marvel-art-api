const User = require("../models/appUser.model");

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
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    username: req.body.username,
    role:req.body.role,
    email: req.body.email,
    avatar:"",
    header:"",
    uploads:[],
    password:hashedPass
    });
    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

const login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
      $and: [{ email: email }],
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
              { email },
              "2f8[{a]-d!("
              // , {
              //   expiresIn: "4h",
              // }
            );
            res.json({
              user:
              {
              user_firstname: user.firstname,
              user_lastname: user.lastname,
              user_name: user.username, 
              user_id: user._id,
              user_role: user.role
            },
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