// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/config.json");

module.exports = function(sequelize, DataTypes) {
  const Vehicle = sequelize.define("Vehicle", {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    make: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    },
    vin: {
      type: DataTypes.INTEGER
    },
    mileage: {
      type: DataTypes.INTEGER
    }
  });
  return Vehicle;
};
