const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");

const Contatos = sequelize.define('contatos',{

       phone:{
           type: Sequelize.STRING,
           allowNull: false
       },
        cellphone:{
           type: Sequelize.STRING,
          allowNull: false
        },
        email:{
           type: Sequelize.STRING,
            allowNull: false
        }

})
Contatos.sync()

module.exports= Contatos