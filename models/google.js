const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('google',{
    username: {
        type: Sequelize.STRING
    },
    googleId: {
        type: Sequelize.STRING
    }
})
User.sync()
module.exports = User