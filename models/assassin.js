"use strict";

module.exports = function(sequelize, DataTypes) {
  var Assassin = sequelize.define("Assassin", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
        Assassin.hasMany(db.People);      
    	}
    }
  });

  return Assassin;
};
