var mongoose=require("mongoose");

var Campground=require("./models/campgrounds");

var Comment=require("./models/comments");


var camps=[{name:"Dinan",
    image:"http://www.all-free-photos.com/images/bretagne/PI17105-hr.jpg",
    description:"sovndsonfb"},
    {name:"Austria",
    image:"https://www.roadaffair.com/wp-content/uploads/2017/10/zell-am-see-salzburg-austria-shutterstock_596814116.jpg",
    description:"sovndsonfb"},
    {name:"Salzburg",
    image:"https://blog.eurail.com/wp-content/uploads/2016/11/Cities-in-Austria-Classic-view-of-Salzburg-with-Salzburg-Cathedral-and-famous-Festung-Hohensalzburg-illuminated-in-beautiful-twilight-during-Christmas-time-in-winter-Austria-main.jpg",
    description:"sovndsonfb"}];




 function seed(){

Campground.remove({},function(err){
   if(err){
       console.log(err);
       
   } 
    console.log("Campgrounds Removed");
    // camps.forEach(function(camp){
    //     Campground.create(camp,function(err,campground){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             console.log('camp added');
    //             Comment.create({text:"testsgsdgs",author:"omar"},function(err,comment){
    //               if(err){
    //                   console.log(err);
    //               } else{
    //                   console.log(comment)
    //                   campground.comments.push(comment);
    //                   campground.save();
    //                   console.log("Comment added");
    //               }
                    
    //             });
    //         }
    //     });
        
    // });
    
});}

module.exports=seed;

