'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoria = sequelize.define('categoria', {
    nomept:{
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    nomeen:{
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    nomefr:{
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    },
  }, {});
  categoria.associate = function(models) {
    // categoria hasmany faqs
    categoria.hasMany(models.faqs)
  };
  return categoria;
};