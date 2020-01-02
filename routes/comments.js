const express = require('express');
      router = express.Router({mergeParams: true});
      Moment = require('../models/moment');
      Comment = require('../models/comment');
      middleware = require('../middleware');

// ================================
// COMMENT Routes
// ================================

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // find campgorund by id
    Moment.findById(req.params.id, (err, foundMoment) => {
        if(err){
            console.log(err)
        }
        res.render("comments/new", { moment: foundMoment})
    })
    
})

//Comment Create
router.post("/", (req, res) => {

    let HTMLcomment = req.body.comment;

    Moment.findById(req.params.id, (err, moment) => {
        
        if(err){
            console.log(err);
        }
        Comment.create(req.body.comment, (err, comment) => {
            if(err){
                req.flash('error', 'Something went wrong');
                console.log(err);
            }
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save()
            moment.comments.push(comment);
            moment.save();
            console.log(comment);
            req.flash('success', 'Successfully Added A Comment');
            res.redirect(`/moments/${moment._id}`);
                
        });
    })
    
})

// EDIT - comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            console.log(err);
            res.redirect('back');
        }
        res.render('comments/edit', {moment_id: req.params.id, comment: foundComment});
    })  
})

// UPDATE - comment
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect('back');
        }
        res.redirect(`/moments/${req.params.id}`);
    })
})

// DESTROY - comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err){
            req.flash('error', 'Oops, Something went wrong');
            console.log(err);
        }
        req.flash('error', 'You deleted your comment');
        res.redirect(`/moments/${req.params.id}`);
    
    })
})

module.exports = router;