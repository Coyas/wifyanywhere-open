const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");


const Login = sequelize.define('login',{
    user:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },

    senha:{
        type: Sequelize.STRING,
    },

})

/*Faqs.belongsTo(Categoria);*//*
*/
// Login.sync();
module.exports = Login
