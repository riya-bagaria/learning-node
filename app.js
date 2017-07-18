var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

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
app.get("/", function (req, res) {
    res.render("landing");

});
app.get("/campground", function (req, res) {
    //get all campground from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });
    //     res.render("campground",{campgrounds:campgrounds});
});

app.post("/campground", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newcampground = {
        name: name,
        image: image,
        description: desc
    };
    //create a new campground and save it to database
    Campground.create(newcampground, function (err, newlycamp) {
        if (err) {
            console.log(err);
        } else {
            //redirect to campgrouund
            res.redirect("/campground");
            console.log("successfully entered the campground");
            console.log(Campground);
        }
    });

});
app.get("/campground/new", function (req, res) {
    res.render("campgrounds/new");
});

//show more info about campgrond
app.get("/campground/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});
//====================
//COMMENTS ROUTES
//====================
app.get("/campground/:id/comments/new", function (req, res) {
    //find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })

});

app.post("/campground/:id/comments", function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campground");
        } else {
            //create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campground/" + campground._id);
                }
            });

        }
    });
});
app.listen(3000, function () {
    console.log("The YelpCamp server has started");
});