"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Assassins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      PeopleId:{
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    })
    .done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Assassins").done(done);
  }
};