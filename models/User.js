const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users',{
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:  {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:  {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
})
User.sync()
module.exports = User
