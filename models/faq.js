'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define('Faq', {
    title:{
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    descricao:{
      type: DataTypes.STRING,
    },
    lingua:{
      type: DataTypes.STRING,
    },
    utilidade: DataTypes.INTEGER
  }, {});
  Faq.associate = function(models) {
    // associations can be defined here
    Faq.belongsTo(models.Category, {foreignKey: 'categoryId'})
  };
  return Faq;
};