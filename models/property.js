'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    deviceId: DataTypes.INTEGER
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};