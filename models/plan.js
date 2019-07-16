'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    nome: DataTypes.STRING,
    qtd_megas: DataTypes.INTEGER,
    preco: DataTypes.DOUBLE,
    txdownload: DataTypes.INTEGER,
    txupload: DataTypes.INTEGER,
    descricao: DataTypes.TEXT
  }, {});
  Plan.associate = function(models) {
    // associations can be defined here
    Plan.hasMany(models.Booking)
  };
  return Plan;
};