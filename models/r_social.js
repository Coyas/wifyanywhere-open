const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");

const RSocial = sequelize.define('r_social',{
    nome:{
        type: sequelize.STRING,
        allowNull: false
    },
    link:{
        type: sequelize.STRING,
        allowNull: false
    }

})

RSocial.sync()

module.exports = RSocial