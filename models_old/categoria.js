const Sequelize = require("sequelize");
const sequelize = require("../config/db.js")
const Faqs = require("./faqs")



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

Categoria.hasMany(Faqs)
Categoria.sync()

module.exports = Categoria

