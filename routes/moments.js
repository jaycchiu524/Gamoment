const express = require('express');
      router = express.Router();
      Moment = require('../models/moment');
      // if only ('../middleware) -> default at index.js
      middleware = require('../middleware');

//=============
// INDEX Routes
//=============

//SHOW moments
router.get("/", (req, res) => {
    // Get all camgrounds from DB
    Moment.find({}, (err, allMoments) => {
        if(err){
            console.log(err);
        }
        res.render("moments/index", {moments: allMoments, page: 'moments'});
    }
    )})

//CREATE moments
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("moments/new");
})

router.post("/", (req, res) => {
    let postname = req.body.postname;
    let game = req.body.game;
    let genre = req.body.genre;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };

    let newMoments = { 
        postname: postname, 
        game: game,
        genre: genre, 
        image: image,
        description: desc,
        author: author
    }

    

    //Create a new moment & save to Database
    Moment.create(newMoments, (err, newlyCreated) => {
        if(err){
            console.log(err);
        }
        console.log(newlyCreated);
        //redirect to /moments
        req.flash('success', 'Successfully Added A Moment');
        res.redirect("/moments");
    })
})

// SHOW - show more info about one moment
router.get("/:id", (req, res) => {
    // find the moment with provided id
    // DB - populate(collection(s)) and then execute callback function
    Moment.findById(req.params.id).populate("comments").exec( (err, foundMoment) => {
        if(err){
            console.log(err);
        }
        //render show template with that moment
        res.render("moments/show", {moment: foundMoment});
        
    })
})

// EDIT - /edit moments route
router.get('/:id/edit', middleware.checkMomentOwnership, (req, res) => {
    Moment.findById(req.params.id, (err, foundMoment) => {
        res.render('moments/edit', {moment: foundMoment});
    })
})

// UPDATE - update in /moments
router.put('/:id', middleware.checkMomentOwnership, (req, res) => {
    // find and update the correct moment
    Moment.findByIdAndUpdate(req.params.id, req.body.moment, (err, updatedMoment) => {
        if(err){
            console.log(err);
        }
        res.redirect(`/moments/${req.params.id}`)
        console.log(updatedMoment);
        
    })
})

// DESTROY - delete moment and comments
router.delete('/:id', middleware.checkMomentOwnership, (req, res) => {
    Comment.deleteMany({
        _id: {
            $in: req.moment.comments
        }
    }, (err) => {
        if(err){
            req.flash('error', 'Oops, Somthing Went Wrong');
            return res.redirect('/');
        }else{
            req.moment.deleteOne((err) => {
                if(err){
                    req.flash('error', 'Oops, Somthing Went Wrong');
                    return res.redirect('/');
                }
                req.flash('error', 'Moment deleted!');
                res.redirect('/moments');
            })
        }
    })

    // moment.findByIdAndDelete(req.params.id, (err) => {
        
    //     req.flash('success', 'Successfully Deleted A moment');
    //     res.redirect(`/moments`);
    
})


module.exports = router;