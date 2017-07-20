var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds");
    indexRoutes=require("./routes/index");
seedDB();

//passport config
app.use(require("express-session")({
    secret: "rusty is adorable dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to control navbar
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

/*Campground.create(
     {
         name:"nandani hills" , 
         image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-3.jpg.838x0_q80.jpg",
         description:"This hill is located in coastal region of southern shore.This nearby beach are rich in coral and emerland."
         
     },function(err,Campground){
         if(err){
             console.log(err);
             console.log("something went wrong");
         }
         else{
             console.log("newly created campground");
             console.log(Campground);
         }
     }
    );*/

/*var campgrounds=[
    {name:"eleohanta cavae" , image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-4.jpg.838x0_q80.jpg"},
    {name:"nandani hills" , image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-3.jpg.838x0_q80.jpg"},
    {name:"kanheri caves" , image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-9.jpg.838x0_q80.jpg"},
    {name:"andaman and nicobat",image:"https://media.mnn.com/assets/images/2015/09/tents-at-night-10.jpg.838x0_q80.jpg"},
    {name:"western coast",image:"https://media.mnn.com/assets/images/2015/09/tents-at-night-5.jpg.838x0_q80.jpg"},
     {name:"eleohanta cavae" , image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-4.jpg.838x0_q80.jpg"},
    {name:"nandani hills" , image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-3.jpg.838x0_q80.jpg"},
    {name:"kanheri caves" , image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-9.jpg.838x0_q80.jpg"},
    {name:"andaman and nicobat",image:"https://media.mnn.com/assets/images/2015/09/tents-at-night-10.jpg.838x0_q80.jpg"},
    {name:"western coast",image:"https://media.mnn.com/assets/images/2015/09/tents-at-night-5.jpg.838x0_q80.jpg"}
    ] ;*/


//requiring routes
app.use("/",indexRoutes);
app.use("/campground/:id/comments",commentRoutes);
app.use("/campground",campgroundRoutes);

app.listen(3000, function () {
    console.log("The YelpCamp server has started");
});