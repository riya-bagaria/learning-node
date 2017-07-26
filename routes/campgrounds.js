var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
//INDEX show all campgrounds
router.get("/", function (req, res) {
    console.log(req.user);
    //get all campground from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
            });
        }
    });
    //     res.render("campground",{campgrounds:campgrounds});
});

router.post("/", function (req, res) {

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
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

//show more info about campgrond
router.get("/:id", function (req, res) {
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
module.exports=router;