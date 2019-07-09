'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    photo: {
      type: DataTypes.STRING
    },
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
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Faq)
  };
  return Category;
};