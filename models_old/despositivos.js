const Sequelize = require("sequelize");
const sequelize = require("../config/db.js");


const Despositivos = sequelize.define('despositivos',{
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    percoDia:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
    }
})
 
Despositivos.sync()


module.exports = Despositivos