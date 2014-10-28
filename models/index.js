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
// var counter = 0;
// function getData(){
//   $.ajax({
//   url:'http://api.randomuser.me/',
//   async: true,
//   dataType: 'json',
//   success:function(data){
//       //function to capitalize the first letter of a string
//     var title = function(string){
//       return string.charAt(0).toUpperCase() + string.slice(1);
//     };
//       //pulling seed data from api
//     var first = title(data.results[0].user.name.first);
//     var last = title(data.results[0].user.name.last);
//     var name = first + " " + last;
//     var address = data.results[0].user.location.street + " " + title(data.results[0].user.location.city) + " " + title(data.results[0].user.location.state);
//     var ssn = data.results[0].user.SSN;
//     var age = Math.floor((Math.random()*101)+1);
//     var gender = data.results[0].user.gender;
//     var photo = data.results[0].user.picture.thumbnail;


//     var chance = function(){
//       return Math.floor((Math.random()*100)+1);
//     };
      
//     var  conditions = function(){      
        

//             //Are you infected?
//       if (chance() <= 8 && age >= 4){
//         console.log("Bad News: You've got Asthma");
//         db.Condition.create({name: "Asthma", cost:5});
//                 // comorbidities.push(1);
//       }
//       if (chance() <= 8 && age >= 40){
//         console.log("Bad News: You've got Cancer");
//         db.Condition.create({name: "Cancer", cost:70});
//                 // comorbidities.push(2);
//       }
//       if (chance() <= 12 && age >= 25){
//         console.log("Bad News: You've got Heart Disease");
//         db.Condition.create({name: "Heart Disease", cost:85});
//                 // comorbidities.push(3);
//       }
//       if (chance() <= 3 && age >= 25){
//         console.log("Bad News: You've got COPD");
//         db.Condition.create({name: "Chronic Obstuctive Pulmonary Sidease", cost:100});
//                 // comorbidities.push(4);
//       }
//       if (chance() <= 2 && age >= 20){
//         console.log("Bad News: You've got Emphysema");
//         db.Condition.create({name: "Emphysema", cost:70});
//                 // comorbidities.push(5);
//       }
//       if (chance() <= 6 && age >= 30){
//         console.log("Bad News: You've got CAD");
//         db.Condition.create({name: "Coronary Artery Disease", cost:100});
//                 // comorbidities.push(6);
//       }
//       if (chance() <= 9){
//         console.log("Bad News: You've got Diabetes");
//         db.Condition.create({name: "Diabetes", cost:65});
//                 // comorbidities.push(7);
//       }
//       if (chance() <= 24 && age >= 20){
//         console.log("Bad News: You've got Hypertension");
//         db.Condition.create({name: "Hypertension", cost:60});
//                 // comorbidities.push(8);
//       }
//       if (chance() <= 2 && age >= 60){
//         console.log("Bad News: You've got Kidney Disease");
//         db.Condition.create({name: "Kidney Disease", cost:80});
//                 // comorbidities.push(9);
//       }
//       if (chance() <= 1 && age >= 50){
//         console.log("Bad News: You've got Liver Disease");
//         db.Condition.create({name: "Liver Disease", cost:83});
//                 // comorbidities.push(10);
//       }
//       if (chance() <= 5){
//         console.log("Bad News: You've got Extreme Obesity");
//         db.Condition.create({name: "Extreme Obesity", cost:10});
//                 // comorbidities.push(11);
//       }
//       if (chance() <= 3 && age >= 60){
//         console.log("Bad News: You've been diagnosed with a Stroke");
//         db.Condition.create({name: "Stroke", cost:70});
//                 // comorbidities.push(12);
//       }
    


//       var kids = function(random){
//         if(random < 10){
//           return 4;
//         } else if (random > 10 && random < 25){
//           return 3;
//         } else if (random > 25 && random < 50){
//           return 2;
//         } else if (random > 50 && random < 80){
//           return 1;
//         } else {
//           return 0;
//         }
//       };
//       var offspring = kids(chance());
//       conditions();

//             // offspring(chance());

//             //push to db
//       db.People.create({
//       name: name,
//       address: address,
//       age: age,
//       ssn: ssn,
//       offspring: offspring,
//       photo: photo
//       });
//           // INSERT INTO People (name,address,age,ssn,comorbidity,offspring,income) VALUES (name, address, age, ssn, comorbidities, offspring, income);



//             //TEST List data
//             // $('.humons').append('<li>' + '<img id="pic" src= '+photo+' />'+ name + " : " + address + " : " + age + " : " + ssn + " : " +comorbidities + " : " + offspring + '</li>');
//             // console.log(data);
//             // counter++;

//             //The amount of users to generate
//       if (counter < 5) getData();
    
//     };
//   }
// });
//People seed data
// db.People.create({name:"Ryan Shim",location:"1234 Some Pl",age:27, offspring:4,ssn:123456789,photo:"ryan.jpg"});
// db.People.create({name:"Brent Amiano",location:"1234 Some Other Pl",age:27, offspring:0,ssn:123456789,photo:"Brent.jpg"});
// db.People.create({name:"Lauren Asazawa",location:"1234 Baylor St",age:27, offspring:0,ssn:987654322,photo:"Lauren.jpg"});
// db.People.create({name:"Matt Grey",location:"1 Restroom Ct.",age:34, offspring:1,ssn:555666742,photo:"Matt.jpg"});
// db.People.create({name:"Sufi Sidhu",location:"4531 32nd St.",age:34, offspring:1,ssn:223193024,photo:"Sufi.jpg"});
// db.People.create({name:"Peter Schulz",location:"37 Infocus",age:18, offspring:1,ssn:423564411,photo:"Peter.jpg"});
// db.People.create({name:"Tif Slama",location:"Ginger Way",age:35, offspring:0,ssn:942869304,photo:"Tiff.jpg"});

//Disease.db data
// db.Condition.create({name: "Asthma", cost:5});
// db.Condition.create({name: "Cancer", cost:70});
// db.Condition.create({name: "Emphysema", cost:70});
// db.Condition.create({name: "Heart Disease", cost:85});
// db.Condition.create({name: "Chronic Obstuctive Pulmonary Sidease", cost:100});
// db.Condition.create({name: "Coronary Artery Disease", cost:100});
// db.Condition.create({name: "Diabetes", cost:65});
// db.Condition.create({name: "Hypertension", cost:60});
// db.Condition.create({name: "Kidney Disease", cost:80});
// db.Condition.create({name: "Liver Disease", cost:83});
// db.Condition.create({name: "Extreme Obesity", cost:10});
// db.Condition.create({name: "Stroke", cost:70});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
