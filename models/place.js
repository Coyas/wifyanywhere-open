'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    nome: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    contato: DataTypes.STRING
  }, {});
  Place.associate = function(models) {
    // associations can be defined here
    Place.hasMany(models.Booking)
  };
  return Place;
};