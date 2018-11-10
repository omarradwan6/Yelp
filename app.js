var express=require("express");
var mongoose=require("mongoose");

 
var url= process.env.DATABASEURL || "mongodb://localhost:27017/thumbnail";

mongoose.connect(url);

// mongoose.connect("mongodb://omarr:omar1234@ds159263.mlab.com:59263/yelpcamping");


var Thumbnail=require("./models/campgrounds.js");
var Comment=require("./models/comments.js");
var User=require("./models/users");
var flash= require("connect-flash");
var seed=require("./seeds");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override");


var commentRoutes=require("./routes/comments.js");
var indexRoutes=require("./routes/index.js");
var campRoutes=require("./routes/campgrounds.js");





var app=express();



app.use(methodOverride("_method"));

var bodyParser=require("body-parser");
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash())
app.set("view engine","ejs");

// seed();

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   
   next();
});

app.use(indexRoutes);
app.use("/camps",campRoutes);
app.use("/camps/:id/comments",commentRoutes);



app.get("/",function(req,res){
    
   res.render("landing"); 
    
    
});


app.listen(process.env.PORT,process.env.IP);