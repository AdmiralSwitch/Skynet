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
      address: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      ssn: {
        type: DataTypes.INTEGER
      },
      comorbidity: {
        type: DataTypes.INTEGER
      },
      offspring: {
        type: DataTypes.INTEGER
      },
      income: {
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