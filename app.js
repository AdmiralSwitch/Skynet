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



//gets you started on the list page
app.get("/work", function(req, res){
  req.session.assignments = 5;
  res.render("list", {session: req.session});
});


//cleaning crews en route
app.get("/cant", function(req, res){

  res.render("evil");
});



//===================================
//         display candidates
//===================================

app.get("/thechosen", function (req, res) {
  db.People.findAll({include:[db.Assassin]}).done(function (err, allPosts) {
    res.render("show", {posts: allPosts});
  });
});


//===================================
//        POST candidates to db
//===================================
var assn = function(){
  var x = Math.floor((Math.random()*10)+1);
  return x;
};

app.post('/post/people', function(req,res){
  //count down
  req.session.assignments -= 1;
  db.People.create({
    name: req.body.name,
    location: req.body.location,
    age: req.body.age,
    offspring: req.body.offspring,
    photo: req.body.photo,
    ssn: req.body.ssn,
    AssassinId: assn()
  });
  if (req.session.assignments <= 0){
    res.redirect("/thechosen");
  } else {
  res.render("list", {session: req.session});
  }
});

//vvv working solution
//   db.People.create({
//     name: req.body.name,
//     location: req.body.location,
//     age: req.body.age,
//     offspring: req.body.offspring,
//     photo: req.body.photo,
//     ssn: req.body.ssn,
    
//   })
//   .done(function(err, person){
//     db.Assassin.find(assn()).done(function(err, assassin){
//       assassin.addPerson(person).done(function(err, whatever){
//         res.redirect("/thechosen");
//       });
//     });
//   });
// });

//===================================
//        Clear db
//===================================
app.delete('/clear', function(db){
  db.destroy().success(function() {
  });
});  


// catch-all for 404 errors
app.get('*', function(req,res){
  res.status(404);
  res.render('404');
});



app.listen(3000, function(){
  console.log("Let's fucking do this, port 3000");
});