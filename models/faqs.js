'use strict';
module.exports = (sequelize, DataTypes) => {
  const faqs = sequelize.define('faqs', {
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
  }, {});
  faqs.associate = function(models) {
    // cada faq pertence a uma categoria
    faqs.belongsTo(models.categoria, { foreignKey: 'categoriaId' })
  };
  return faqs;
};