'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {});
  Device.associate = function(models) {
    // associations can be defined here
  };
  return Device;
};