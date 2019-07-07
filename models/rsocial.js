'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsocial = sequelize.define('Rsocial', {
    nome: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  Rsocial.associate = function(models) {
    // associations can be defined here
  };
  return Rsocial;
};