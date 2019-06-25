const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users',{
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
        allowNull: true
    },
    password:  {
        type: Sequelize.STRING(70),
        allowNull: true
    },
    photo: {
        type: Sequelize.STRING(150)
    },
    localId: {
        type: Sequelize.STRING
    },
    facebookId: {
        type: Sequelize.STRING
    },
    googleId: {
        type: Sequelize.STRING
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


})
User.sync()
module.exports = User
