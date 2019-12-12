const mongoose = require('mongoose');

//SCHEMA SETUP - table/properties 
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
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
module.exports = mongoose.model("Campground", campgroundSchema);

// create a collection at database named "Campground"
// let Campground = mongoose.model("Campground", campgroundSchema);