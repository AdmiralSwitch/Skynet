"use strict";

module.exports = function(sequelize, DataTypes) {
  var People = sequelize.define("People", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    age: DataTypes.INTEGER,
    offspring: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    ssn: DataTypes.STRING,
    AssassinId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(db) {
        // People.hasMany(db.Condition);
        People.belongsTo(db.Assassin);
      }
    }
  });

  return People;
};
