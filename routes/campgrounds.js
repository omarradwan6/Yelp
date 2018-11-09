
var express=require("express");
var router=express.Router();
var Thumbnail=require("../models/campgrounds.js")




router.get("/",function(req,res){
Thumbnail.find({},function(err,allcamps){
    if(err){
        console.log(err);
    }else{
        res.render("campgrounds/camps",{camps:allcamps});
    }
});
});


router.post("/",isLoggedIn,function(req,res){
    
    
Thumbnail.create({name:req.body.newcamp,
image:req.body.newImage,
description:req.body.desc,
price:req.body.price,
author:{ id:req.user._id,username:req.user.username}
    
},function(err,thumb){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Successfully added camp")
            res.redirect("/camps");
        }
    });
});

router.get("/new",isLoggedIn,function(req,res){
    
   res.render("campgrounds/new");
    
    
});




//EDIT route

router.get("/:id/edit",checkCampgroundOwnership,function(req,res){
   Thumbnail.findById(req.params.id,function(err,camp){
       
       if(err){
           console.log(err)
       }else{
           
               res.render("campgrounds/edit",{camp:camp})
           
       }
   })
});



router.put("/:id",checkCampgroundOwnership,function(req,res){
    
Thumbnail.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
    
    if(err){
        
        console.log(err);
    }else{
        req.flash("success","Successfully edited camp")
        res.redirect("/camps");
    }
})
    
});




router.delete("/:id",checkCampgroundOwnership,function(req,res){
    
Thumbnail.findByIdAndRemove(req.params.id,function(err){
    if(err){
        res.redirect("camps/:id")
    }else{
        req.flash("success","Successfully deleted camp")
        res.redirect("/camps");
    }

});
});

router.get("/:id",function(req,res){
    
    Thumbnail.findById(req.params.id).populate('comments').exec(function(err,shown){
        if(err){
            console.log(err);
        }
        else{
            console.log(shown);
            res.render("campgrounds/show",{camp:shown});
        }
        
    });
    
});




function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error","You need to be loogged in first")
    res.redirect("/login");
}


function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Thumbnail.findById(req.params.id,function(err,camp){
            if(err){
                req.flash("error","Camp not found")
                res.redirect("back");
            }else{
                if(camp.author.id.equals(req.user._id)){
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




