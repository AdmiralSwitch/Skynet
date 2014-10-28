"use strict";

module.exports = function(sequelize, DataTypes) {
  var Condition = sequelize.define("Condition", {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    PeopleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(db) {
        Condition.belongsTo(db.People);
      }
    }
  });

  return Condition;
};
