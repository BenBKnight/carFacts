// creates the maintenance model for the database

module.exports = function(sequelize, DataTypes) {
  const Maintenance = sequelize.define("Maintenance", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING
    },

    milage: {
      type: DataTypes.INTEGER
    },

    parts: {
      type: DataTypes.STRING
    },

    jobDate: {
      type: DataTypes.DATEONLY
    },

    vehicle:{
      type: DataTypes.STRING
    }
  });
  
  return Maintenance;
};