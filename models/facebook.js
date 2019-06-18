const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('facebook',{
    username: {
        type: Sequelize.STRING
    },
    facebookId: {
        type: Sequelize.STRING
    }
})
User.sync()
module.exports = User