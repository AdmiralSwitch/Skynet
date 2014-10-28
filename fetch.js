// "use strict";


// // var Sequelize = require("sequelize");
// var http       = require("http");
// // var sequelize = new Sequelize(config.database, config.username, config.password, config);
// var db        = {};

// var getData = function (buzzer){
//   console.log("START");
//   var options = {
//     host: 'api.randomuser.me',
//     path: '/'
//   };

//   var process = function(response) {
//     console.log("IN CALLBACK");
//     var str = '';

//     //another chunk of data has been recieved, so append it to `str`
//     response.on('data', function (chunk) {
//       str += chunk;
//     });

//   //the whole response has been recieved, so we just print it out here
//     response.on('end', function () {
//       // console.log(JSON.parse(str));
//       buzzer(str);
//     });
//   };

//   http.request(options, process).end();
// }; 


// getData(function(leUser){ console.log("Callback done:" + leUser)});