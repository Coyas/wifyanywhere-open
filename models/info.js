'use strict';
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    sobrenos: DataTypes.TEXT,
    poli_cansel: DataTypes.TEXT,
    advertencia: DataTypes.TEXT
  }, {});
  Info.associate = function(models) {
    // associations can be defined here
  };
  return Info;
};