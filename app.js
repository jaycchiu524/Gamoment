const express    = require('express');
      app        = express();
      bodyParser = require('body-parser');
      mongoose   = require('mongoose');
      Campground = require('./models/campground');
      Comment    = require('./models/comment');
      User       = require('./models/user')
      seedDB     = require('./seeds');
      passport   = require('passport');
      LocalStrategy = require('passport-local');
      medthodOverride = require('method-override');
      flash           = require('connect-flash');

// Requiring ROUTES
const commentsRoutes = require('./routes/comments');
// const campgroundsRoutes = require('./routes/campgrounds');
const momentsRoutes = require('./routes/moments');
const indexRoutes = require('./routes/index');


//useNewUrlParse useUnifiedTopology useFindAndModify for higher than 3.1 version
// mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect("mongodb+srv://jaycchiu524:Jj52041314@cluster0-qcjmq.mongodb.net/yelpcamp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// add in stylesheet
//__dirname -> current workplace
app.use(express.static(__dirname + "/public"));
app.use(medthodOverride('_method'));
app.use(flash());
//SEED the database
// seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "LOGGED",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass currentUser to every routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_message = req.flash('success');
    res.locals.error_message = req.flash('error');
    next();
})

app.use('/', indexRoutes);
app.use('/moments', momentsRoutes);
// Will make 'req.params.id' = null -> 
// const router = express.Router({mergeParams: true})
app.use('/moments/:id/comments/', commentsRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log("GaMoment is listening on PORT 3000");
})