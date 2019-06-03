const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");

const Categoria = sequelize.define('categoria',{
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
    }

})
module.exports =  Categoria