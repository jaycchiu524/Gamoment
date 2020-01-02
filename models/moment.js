const mongoose = require('mongoose');

//SCHEMA SETUP - table/properties 
var momentSchema = new mongoose.Schema({
    postname: String,
    game: String,
    genre: String,
    releaseDate: {
        type: Date,
        max: '01/01/2020',
        min: '01/01/1960'
    },
    image: String,
    description: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

//app.js - require
module.exports = mongoose.model("Moment", momentSchema);

// create a collection at database named "Campground"
// let Campground = mongoose.model("Campground", campgroundSchema);