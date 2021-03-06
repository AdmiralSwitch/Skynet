"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Conditions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      cost: {
        type: DataTypes.INTEGER
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
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Conditions").done(done);
  }
};