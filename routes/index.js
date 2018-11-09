var express=require("express");
var router=express.Router();
var User=require("../models/users.js");
var passport=require("passport");









router.get("/",function(req,res){
   res.render("landing");
});









router.get("/register", function(req, res){
   res.render("register"); 
});


router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome "+req.user.username);
           res.redirect("/camps"); 
        });
    });
});



router.get("/login", function(req, res){
   res.render("login"); 
});




router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/camps",
        failureRedirect: "/login"
    }), function(req, res){
});


router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","You are logged out")
   res.redirect("/camps");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Can't login")
    res.redirect("/login");
}





module.exports=router;




