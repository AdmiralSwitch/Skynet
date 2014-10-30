"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

//People seed data
// db.People.create({name:"Ryan Shim",location:"1234 Some Pl",age:27, offspring:4,ssn:123456789,photo:"ryan.jpg"});
// db.People.create({name:"Brent Amiano",location:"1234 Some Other Pl",age:27, offspring:0,ssn:123456789,photo:"Brent.jpg"});
// db.People.create({name:"Lauren Asazawa",location:"1234 Baylor St",age:27, offspring:0,ssn:987654322,photo:"Lauren.jpg"});
// db.People.create({name:"Matt Grey",location:"1 Restroom Ct.",age:34, offspring:1,ssn:555666742,photo:"Matt.jpg"});
// db.People.create({name:"Sufi Sidhu",location:"4531 32nd St.",age:34, offspring:1,ssn:223193024,photo:"Sufi.jpg"});
// db.People.create({name:"Peter Schulz",location:"37 Infocus",age:18, offspring:1,ssn:423564411,photo:"Peter.jpg"});
// db.People.create({name:"Tif Slama",location:"Ginger Way",age:35, offspring:0,ssn:942869304,photo:"Tiff.jpg"});

//Assassins.db data
// db.Assassin.create({title: "Mexican Death Squad"});
// db.Assassin.create({title: "Ninjas"});
// db.Assassin.create({title: "Red Team"});
// db.Assassin.create({title: "Snipers"});
// db.Assassin.create({title: "Dwarves with hammers"});
// db.Assassin.create({title: "Gimps"});
// db.Assassin.create({title: "Tif Slama"});

// db.Assassin.create({title: "Gimps"});
// db.Assassin.create({title: "Gimps"});
// db.Assassin.create({title: "Gimps"});
// db.Assassin.create({title: "Gimps"});
// db.Assassin.create({title: "Gimps"});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
