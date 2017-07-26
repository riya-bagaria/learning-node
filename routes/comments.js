
var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");

//comments new
router.get("/new", isLoggedIn, function (req, res) {
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

//comment create
router.post("/", function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campground");
        } else {
            //create new comment
            Comment.create(req.body.comment, function (err, comment) {
              //add user and id to comment
              //save comment
              comment.author.id=req.user._id;
              comment.author.username=req.user.username;
               
               comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    //redirect campground show page
                    res.redirect("/campground/" + campground._id);
                
            });

        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports=router;