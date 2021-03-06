"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("People", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      offspring: {
        type: DataTypes.INTEGER
      },
      photo: {
        type: DataTypes.STRING
      },
      ssn: {
        type: DataTypes.STRING
      },
      AssassinId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("People").done(done);
  }
};