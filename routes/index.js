const express = require('express');
      router = express.Router();
      passport   = require('passport');
      User = require('../models/user');
      middleware = require('../middleware');

//HOME Routes
router.get("/", (req, res) => {
    res.redirect("/moments");
})

// ==================
// AUTH Routes
// ==================

//SHOW register form
router.get("/register", (req, res) => {
    res.render("register",{page: 'register'});
})

//HANDLING register logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash('error', err.message);
            return res.redirect("/register");
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', `Welcome to Yelp Camp, ${user.username}`);
            res.redirect("/moments");
        });
        
    })
})

// =============
// LOGIN Routes
// =============

// SHOW Login form
router.get("/login", (req, res) => {
    res.render("login", {page: 'login'});
})

//HANDLING login logic
router.post("/login", passport.authenticate('local',{
    successRedirect: "/moments",
    failureRedirect: "/login"
}),(req, res) => {  
    
})

// LOGOUT Route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out!');
    res.redirect("/moments");
})

module.exports = router;