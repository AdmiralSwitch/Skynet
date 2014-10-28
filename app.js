var express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  session = require("cookie-session"),
  db = require("./models/index"),
  flash = require('connect-flash'),
  app = express();
  var morgan = require('morgan');
  //artisional middleware to route auth
  var routeMiddleware = require("./config/routes");




// Middleware for ejs, grabbing HTML and including static files
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}) );
app.use(express.static(__dirname + "/public"));


app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  // this is in milliseconds
  maxage: 3600000
  })
);

// get passport started
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// prepare our serialize functions
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.User.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){
      done(error, user);
    });
});
app.get('/', routeMiddleware.preventLoginSignup, function(req,res){
    res.render('index');
});

app.get('/signup', routeMiddleware.preventLoginSignup, function(req,res){
    res.render('signup', { username: ""});
});

app.get('/login', routeMiddleware.preventLoginSignup, function(req,res){
    res.render('login', {message: req.flash('loginMessage'), username: ""});
});

app.get('/home', routeMiddleware.checkAuthentication, function(req,res){
  res.render("home", {user: req.user});
});

// on submit, create a new users using form values
app.post('/submit', function(req,res){

  db.User.createNewUser(req.body.username, req.body.password,
  function(err){
    res.render("signup", {message: err.message, username: req.body.username});
  },
  function(success){
    res.render("index", {message: success.message});
  });
});

// authenticate users when logging in - no need for req,res passport does this for us
app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', function(req,res){
  //req.logout added by passport - delete the user id/session
  req.logout();
  res.redirect('/');
});



app.get("/work", function(req, res){
  
  res.render("list", {mood: "nice"});
});

app.get("/meh", function(req, res){

  res.render("meh", {mood: "meh..."});
});

app.get("/cant", function(req, res){

  res.render("evil", {mood: "EVIL"});
});


//===================================
//         display candidates
//===================================
// db.people.findAll();
// app.get("/posts", function (req, res) {
//   db.Post.findAll({include: [db.Author]}).done(function (err, allPosts) {
//     res.render("posts/index.ejs", {posts: allPosts});
//   });
// });
//

// catch-all for 404 errors
app.get('*', function(req,res){
  res.status(404);
  res.render('404');
});



app.listen(3000, function(){
  console.log("get this party started on port 3000");
});