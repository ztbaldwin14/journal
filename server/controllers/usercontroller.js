// let express = require("express");
// let router = express.Router();
// let sequelize = require("../db");
// let User = sequelize.import("../models/user.js");

const router = require("express").Router();
const User = require("../db").import("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");
//Create a new endpoint : /create
//The endpoint is going to be a post request
//Have an object that matches the model of UserTable (email/password).
//Let sequelize create a new record in the database (create)

/* ***********************
 *** USER SIGNUP ***
 ********************** */
router.post("/create", function (req, res) {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});
//Create a new endpoint : /login
//The endpoint is going to be a post request
//Build a query statement (Hard code in a user's email that exists in your database)
//Use FineOne
//Let sequelize return a success
//If we find one return user info and if user doesn't exist return "user does not exist"
/* ***********************
 *** USER SIGNIN ***
 ********************** */
router.post("/login", function (req, res) {
  User.findOne({ where: { email: req.body.user.email } })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });
              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;