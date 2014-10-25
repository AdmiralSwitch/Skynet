"use strict";

module.exports = function(sequelize, DataTypes) {
  var Condition = sequelize.define("Condition", {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Condition;
};