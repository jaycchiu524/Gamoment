// Method 1
// let middlewareObj = {};
// middlewareObj.checkOwnership = function(){

// }
// module.exports = middlewareObj

// Method 2
// let middlewareObj = {
    // checkOwnership: function(){

    // }
// };

// Method 3
// module. exports = {

// }

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err || !foundCampground){
                console.log(err);
                req.flash('error', 'Moment Not Found');
                res.redirect('back');
            }
            
            // foundCampground.author.id -> mongoose object
            // req.user._id -> string , cannot use "===" but equal method(from mongoose)
            else if(foundCampground.author.id.equals(req.user._id)){
                req.campground = foundCampground;
                next();
            }else{
                req.flash('error', 'You do not have the permission');
                res.redirect('back');
            }
        });
    }else{
        console.log("Need to be logged in");
        res.redirect('back');
    };
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment){
                console.log(err);
                req.flash('error', 'Comment Not Found');
                res.redirect('back');
            }
            // foundCampground.author.id -> mongoose object
            // req.user._id -> string , cannot use "===" but equal method(from mongoose)
            else if(foundComment.author.id.equals(req.user._id)){
                req.comment = foundComment;
                next();
            }else{
                req.flash('error', 'You do not have the permission');
                res.redirect('back');
            }
        });
    }else{
        req.flash('error', 'PLEASE LOGIN');
        res.redirect('back');
    };
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'PLEASE LOGIN');
    res.redirect('/login');
}

module.exports = middlewareObj;