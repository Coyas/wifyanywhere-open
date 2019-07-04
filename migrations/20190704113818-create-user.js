'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email:  {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique:true
      },
      password:  {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      photo: {
        type: Sequelize.STRING(150)
      },
      localId: {
        type: Sequelize.SMALLINT
      },
      facebookId: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      googleId: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      street_adress: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      biling_adress: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.SMALLINT
      },
      access: {
        type: Sequelize.SMALLINT
      },
      accessToken:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      confirme:{
        type: Sequelize.SMALLINT,
        defaultValue: false
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
    return queryInterface.dropTable('Users');
  }
};