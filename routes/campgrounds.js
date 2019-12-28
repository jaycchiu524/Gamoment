const express = require('express');
      router = express.Router();
      Campground = require('../models/campground');
      // if only ('../middleware) -> default at index.js
      middleware = require('../middleware');

//=============
// INDEX Routes
//=============

//SHOW campgrounds
router.get("/", (req, res) => {
    // Get all camgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        }
        res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
    }
    )})

//CREATE campgrounds
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

router.post("/", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let price = req.body.price;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };

    let newCampgrounds = { 
        name: name, 
        price: price,
        image: image,
        description: desc,
        author: author
    }

    

    //Create a new campground & save to Database
    Campground.create(newCampgrounds, (err, newlyCreated) => {
        if(err){
            console.log(err);
        }
        console.log(newlyCreated);
        //redirect to /campgrounds
        req.flash('success', 'Successfully Added A GaMoment');
        res.redirect("/campgrounds");
    })
})

// SHOW - show more info about one campground
router.get("/:id", (req, res) => {
    // find the campground with provided id
    // DB - populate(collection(s)) and then execute callback function
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        }
        //render show template with that campground
        res.render("campgrounds/show", {campground: foundCampground});
        
    })
})

// EDIT - /edit campgrounds route
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground: foundCampground});
    })
})

// UPDATE - update in /campgrounds
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            console.log(err);
        }
        res.redirect(`/campgrounds/${req.params.id}`)
        console.log(updatedCampground);
        
    })
})

// DESTROY - delete campground and comments
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Comment.deleteMany({
        _id: {
            $in: req.campground.comments
        }
    }, (err) => {
        if(err){
            req.flash('error', 'Oops, Somthing Went Wrong');
            return res.redirect('/');
        }else{
            req.campground.deleteOne((err) => {
                if(err){
                    req.flash('error', 'You Deleted A GaMoment');
                    return res.redirect('/');
                }
                req.flash('error', 'Campground deleted!');
                res.redirect('/campgrounds');
            })
        }
    })

    // Campground.findByIdAndDelete(req.params.id, (err) => {
        
    //     req.flash('success', 'Successfully Deleted A Campground');
    //     res.redirect(`/campgrounds`);
    
})


module.exports = router;