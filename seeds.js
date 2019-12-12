const mongoose = require('mongoose');
      Campground = require('./models/campground');
      Comment = require('./models/comment')

// let data = [
//     {
//         name: "Pui O",
//         image: "https://a.bbkz.net/forum/attachment.php?attachmentid=2660743&d=1548686155",
//         description: "Too far from city!"
//     },

//     {
//         name: "Tap Mun",
//         image: "https://www.getreadyhk.com/images/stories/lifestyle/tapmun/tapmun_12.jpg",
//         description: "Travel by boats, nice view!"
//     },

//     {
//         name: "Wan Chai",
//         image: "https://img3.htimgs.com/2013/1224/20131224013210442.jpg",
//         description: "Nice view of sea, have toilets and bathrooms. Becareful of bulls."
//     }
// ]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, err => {
        // try{
        //     console.log('removed campgrounds!');
        //     //Remove all comments as well
        //     Comment.deleteMany({}, (err) => {
        //         try{
        //             console.log('removed comments!');
        //         }catch(err){
        //             console.log(err);
        //         }
                
        //         // Add a few campgrounds 
        //         data.forEach((seed) => {
        //             Campground.create(seed, (err, campground) => {
        //                 try{
        //                     console.log('added data');
        //                     //CREATE a comment
        //                     Comment.create(
        //                         {
        //                             text: "This is a nice campsite!",
        //                             author: "Yau Wan Ying"
        //                         }, (err, comment) => {
        //                             //Associate with campgrounds
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("**Create a new comment");
        //                         }
        //                     )
        //                 }catch(err){
        //                     console.log(err);
        //                 }
        //             })
        //         })
        //     })
        // }catch(err){
        //     console.log(err);
        // }    
    });
};

//

module.exports = seedDB;