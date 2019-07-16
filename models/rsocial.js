'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsocial = sequelize.define('Rsocial', {
    nome: DataTypes.STRING,
    icon: DataTypes.STRING(100),
    link: DataTypes.STRING,
  }, {});
  Rsocial.associate = function(models) {
    // associations can be defined here
  };
  return Rsocial;
};