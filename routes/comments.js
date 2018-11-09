var express=require("express");
var router=express.Router({mergeParams:true});
var Thumbnail=require("../models/campgrounds.js")
var Comment=require("../models/comments.js")



// NEW COMMENTS
router.get("/new",isLoggedIn,function(req,res){
    Thumbnail.findById(req.params.id,function(err,camp){
       if(err){
           console.log(err);
           
       } else{
              res.render("comments/new",{camp:camp});
       }
        
        
    });

    
});

//CREATE COMMENTS
router.post("/",isLoggedIn,function(req,res){
    Thumbnail.findById(req.params.id,function(err,camp){
       if(err){
           console.log(err);
       } else{
           
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success","Successfully added comment")
                    res.redirect("/camps/"+req.params.id);
               }
               
           });

       }
        
        
    });

    
});



router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
    
    Comment.findById(req.params.comment_id,function(err,foundcomment){
       if(err){
           console.log(err);
           
       } else{
              res.render("comments/edit",{camp_id:req.params.id,comment:foundcomment});
       }
        
        
    });

    
});
    
    
    
router.put("/:comment_id",checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
       
       if(err){
           console.log(err);
       }else{
           req.flash("success","Successfully edited comment")
           res.redirect("/camps")
           
       }
       
       
   }) 
    
    
    
    
});
    

router.delete("/:comment_id",checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
           console.log(err);
           
       }else{
           req.flash("success","Successfully deleted comment")
           res.redirect("/camps");
       }
       
   }) 
    
    
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be loogged in first")
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err){
                req.flash("error","shit")
                res.redirect("back");
            }else{
                if(foundcomment.author.id.equals(req.user._id)){
                   next(); 
                }else{
                    req.flash("error","You have no permission to do this action")
                    res.redirect("back")
                }
            }
        });
    }else{
        req.flash("error","You need to be loogged in first")
        res.redirect("back")
    }
}




module.exports=router;




