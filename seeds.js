var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment=require("./models/comment");
var data = [{
        name: "Cloud's Test",
        image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-12.jpg.653x0_q80_crop-smart.jpg",
        description: "The number of people walking out their front doors, tent in hand, to go camping is on the rise. According to the Statistics Portal, camping has risen from more than 41 million campers hitting the trail in 2008 to nearly 45.5 million in 2014. Wanderlust and a focus on the great outdoors in popular social media platforms like Instagram have more people than ever searching for some time in nature, away from the bustle of daily life and among the flora and fauna."
    },
    {
        name: "Sahara Deert",
        image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-1.jpg.838x0_q80.jpg",
        description: "Find a location to set up camp before dark. Ensuring you have a safe camping site with daylight left means you won't be trying to hike around looking for a spot in the dark, and potentially getting lost as a result."
    },
    {
        name: "rajwada ghati",
        image: "https://media.mnn.com/assets/images/2015/09/tents-at-night-4.jpg.838x0_q80.jpg",
        description: ": Make sure your tent is weatherproof, and that you bring a sleeping bag suitable for any kind of weather. It's both uncomfortable and dangerous to find yourself with a lightweight sleeping bag if the temperature drops lower than expected."
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        //Remove all campgrounds
        if (err) {
            console.log(err);
        }
        console.log("removed campground");
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a campground");
                    Comment.create({
                        text:"This place is heave",
                        author:"Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new commentn");
                        }
                    });
                }
            });
        });
    });
    //add a few campgrounds
    //add a few comments
}
module.exports = seedDB;