'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomept:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      nomeen:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      nomefr:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categoria');
  }
};