const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//don't need get routes to load pages, already handled in react front end.
// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

//don't need get routes to load pages, already handled in react front end.
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    // res.render("auth/signup", { message: "Indicate username and password" });
    // return;
    res.status(400).json({ message: "Indicate username and password" });
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      // res.render("auth/signup", { message: "The username already exists" });
      // return;
      res.status(400).json({ message: "The username already exists" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    //change all render methods to return a status in JSON

    newUser
      .save()
      .then(() => {
        // res.redirect('/')
        req.login();
        res.status(200).json(newUser);
      })
      .catch((err) => {
        // res.render("auth/signup", { message: "Something went wrong" });
        res.status(400).json({ message: "something went wrong" });
      });
  });
});

router.delete("/logout", (req, res) => {
  req.logout();
  // res.redirect("/");
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
