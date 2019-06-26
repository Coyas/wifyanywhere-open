const Sequelize = require('sequelize');
const sequelize = require('../config/db')

const User = sequelize.define('users',{
    id: {
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
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

})
User.sync()
module.exports = User
