"use strict";

module.exports = function(sequelize, DataTypes) {
  var People = sequelize.define("People", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    ssn: DataTypes.INTEGER,
    comorbidity: DataTypes.INTEGER,
    offspring: DataTypes.INTEGER,
    income: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return People;
};
