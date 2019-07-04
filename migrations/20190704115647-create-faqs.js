'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('faqs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      descricao:{
        type: Sequelize.STRING,
      },
      lingua:{
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false, 
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('faqs');
  }
};